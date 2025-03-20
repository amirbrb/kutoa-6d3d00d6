
import React, { useState } from 'react';
import { MapPin, Locate, Search } from 'lucide-react';
import styles from './LocationPicker.module.css';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void;
}

function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        
        setCurrentLocation(location);
        onLocationSelect(location);
        
        // Simulate address lookup from coordinates (geocoding)
        // In a real app, you would use a service like Google Maps Geocoding API
        setTimeout(() => {
          setCurrentLocation({
            ...location,
            address: '123 Example Street, City, Country'
          });
          setIsLoading(false);
        }, 1000);
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Permission to access location was denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setError('The request to get user location timed out');
            break;
          default:
            setError('An unknown error occurred');
            break;
        }
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    // Simulate address search (geocoding)
    // In a real app, you would use a service like Google Maps Geocoding API
    setTimeout(() => {
      const mockLocation = {
        latitude: 34.052235,
        longitude: -118.243683,
        address: searchQuery
      };
      
      setCurrentLocation(mockLocation);
      onLocationSelect(mockLocation);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.locationPicker}>
      <div className={styles.header}>
        <h3 className={styles.title}>Choose Your Location</h3>
        <p className={styles.subtitle}>
          Select your current location or search for an address
        </p>
      </div>
      
      <button 
        className={styles.currentLocationBtn}
        onClick={getCurrentLocation}
        disabled={isLoading}
      >
        <Locate size={18} />
        Use Current Location
        {isLoading && <span className={styles.loadingIndicator}></span>}
      </button>
      
      <div className={styles.divider}>
        <span>or</span>
      </div>
      
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <MapPin size={18} className={styles.searchIcon} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for address"
            className={styles.searchInput}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.searchButton}
          disabled={isLoading || !searchQuery.trim()}
        >
          <Search size={18} />
        </button>
      </form>
      
      {error && <ErrorIndicator error={error} />}
      
      {currentLocation && currentLocation.address && (
        <div className={styles.selectedLocation}>
          <MapPin size={18} />
          <p>{currentLocation.address}</p>
        </div>
      )}
      
      <div className={styles.mapPlaceholder}>
        {currentLocation ? (
          <div className={styles.map}>
            <div className={styles.mapPin}>
              <MapPin size={24} />
            </div>
            <div className={styles.coordinates}>
              {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
            </div>
          </div>
        ) : (
          <div className={styles.emptyMap}>
            <MapPin size={32} />
            <p>Location will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
