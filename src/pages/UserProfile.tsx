
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Label } from '../components/ui/label';
import { User, MapPin, Mail, Heart, Calendar, Image, Save } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: '',
    location: '',
    joinDate: new Date(),
    about: '',
    hobbies: [] as string[],
  });
  const [hobbiesInput, setHobbiesInput] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/login';
      return;
    }

    const user = JSON.parse(storedUser);
    const now = new Date();
    
    setUserData({
      name: user.name || user.email.split('@')[0],
      email: user.email,
      avatar: user.avatar || '',
      location: user.location || 'No location set',
      joinDate: user.joinDate ? new Date(user.joinDate) : now,
      about: user.about || 'No bio provided yet.',
      hobbies: user.hobbies || [],
    });
    
    setHobbiesInput(user.hobbies ? user.hobbies.join(', ') : '');
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    
    if (isEditing) {
      // Reset form if canceling edit
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setHobbiesInput(user.hobbies ? user.hobbies.join(', ') : '');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbiesInput(e.target.value);
  };

  const handleSaveChanges = () => {
    // Parse hobbies from comma-separated text
    const hobbies = hobbiesInput
      .split(',')
      .map(hobby => hobby.trim())
      .filter(hobby => hobby !== '');

    const updatedUserData = {
      ...userData,
      hobbies
    };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>User Profile</h1>
        
        <div className={styles.profileGrid}>
          <div className={styles.profileSidebar}>
            <Card className={styles.avatarCard}>
              <CardContent className={styles.avatarCardContent}>
                <div className={styles.avatarContainer}>
                  <Avatar className={styles.avatar}>
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className={styles.avatarFallback}>
                      {userData.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <Button variant="outline" size="sm" className={styles.changeAvatarButton}>
                      <Image size={16} />
                      <span>Change Photo</span>
                    </Button>
                  )}
                </div>
                
                <h2 className={styles.avatarName}>{userData.name}</h2>
                <p className={styles.avatarEmail}>{userData.email}</p>
                
                {!isEditing ? (
                  <Button 
                    onClick={handleEditToggle} 
                    variant="outline" 
                    className={styles.editProfileButton}
                  >
                    <User size={16} />
                    <span>Edit Profile</span>
                  </Button>
                ) : (
                  <div className={styles.editActions}>
                    <Button 
                      onClick={handleSaveChanges} 
                      className={styles.saveButton}
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </Button>
                    <Button 
                      onClick={handleEditToggle} 
                      variant="outline" 
                      className={styles.cancelButton}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsHeader}>
                <CardTitle className={styles.statsTitle}>Account Info</CardTitle>
              </CardHeader>
              <CardContent className={styles.statsContent}>
                <div className={styles.statItem}>
                  <Mail size={16} />
                  <div>
                    <p className={styles.statLabel}>Email</p>
                    <p className={styles.statValue}>{userData.email}</p>
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <MapPin size={16} />
                  <div>
                    <p className={styles.statLabel}>Location</p>
                    {isEditing ? (
                      <Input 
                        name="location"
                        value={userData.location}
                        onChange={handleInputChange}
                        className={styles.editInput}
                      />
                    ) : (
                      <p className={styles.statValue}>{userData.location}</p>
                    )}
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <Calendar size={16} />
                  <div>
                    <p className={styles.statLabel}>Member Since</p>
                    <p className={styles.statValue}>{formatDate(userData.joinDate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className={styles.profileMain}>
            <Card className={styles.aboutCard}>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
                <CardDescription>Tell others a bit about yourself</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea 
                    name="about"
                    value={userData.about}
                    onChange={handleInputChange}
                    placeholder="Write a short bio about yourself..."
                    className={styles.aboutTextarea}
                  />
                ) : (
                  <p className={styles.aboutText}>{userData.about}</p>
                )}
              </CardContent>
            </Card>
            
            <Card className={styles.hobbiesCard}>
              <CardHeader>
                <CardTitle>Hobbies & Interests</CardTitle>
                <CardDescription>Things you enjoy doing</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className={styles.editHobbies}>
                    <Label htmlFor="hobbies">Enter your hobbies (comma separated)</Label>
                    <Input 
                      id="hobbies"
                      value={hobbiesInput}
                      onChange={handleHobbiesChange}
                      placeholder="Reading, Hiking, Photography..."
                      className={styles.editInput}
                    />
                    <p className={styles.inputHelp}>Press comma to separate different hobbies</p>
                  </div>
                ) : (
                  <div className={styles.hobbiesList}>
                    {userData.hobbies.length > 0 ? (
                      userData.hobbies.map((hobby, index) => (
                        <Badge key={index} className={styles.hobbyBadge}>
                          <Heart size={12} className={styles.hobbyIcon} />
                          {hobby}
                        </Badge>
                      ))
                    ) : (
                      <p className={styles.noHobbies}>No hobbies added yet.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
