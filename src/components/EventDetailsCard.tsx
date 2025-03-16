
import React from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';

interface EventDetailsProps {
  id: string;
  title: string;
  location: string;
  distance?: string;
  createdBy: string;
  createdById: string;
  time: Date;
  participants: number;
  type: 'medical' | 'donation' | 'volunteer' | 'other';
  description?: string;
  onJoin?: () => void;
  onCancel?: () => void;
  isUserEvent?: boolean;
}

const EventDetailsCard = ({
  id,
  title,
  location,
  distance,
  time,
  participants,
  type,
  onJoin,
  onCancel,
  isUserEvent = false
}: EventDetailsProps) => {
  const navigate = useNavigate();
  
  const formatEventTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getEventTypeClass = (type: string) => {
    switch (type) {
      case 'medical':
        return styles.medicalEvent;
      case 'donation':
        return styles.donationEvent;
      case 'volunteer':
        return styles.volunteerEvent;
      default:
        return styles.otherEvent;
    }
  };

  const handleCardClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <Card 
      className="w-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <span className={`${getEventTypeClass(type)} eventType`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          {distance && (
            <span className="text-xs text-muted-foreground">{distance}</span>
          )}
        </div>
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
      </CardHeader>
      <CardContent className="pt-0 pb-2 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>{formatEventTime(time)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center border-t">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users size={14} />
          <span>{participants} participants</span>
        </div>
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          {isUserEvent ? (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel Event
            </Button>
          ) : (
            <Button size="sm" onClick={onJoin}>
              Join Event
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventDetailsCard;
