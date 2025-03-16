
import React from 'react';
import { MapPin, Clock, Info, User, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

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
  title,
  location,
  distance,
  createdBy,
  time,
  participants,
  type,
  description,
  onJoin,
  onCancel,
  isUserEvent = false
}: EventDetailsProps) => {
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

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'medical':
        return "bg-red-100 text-red-600";
      case 'donation':
        return "bg-green-100 text-green-600";
      case 'volunteer':
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={`${getEventTypeColor(type)} rounded-full px-3 py-1 text-xs`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          {distance && (
            <span className="text-xs text-muted-foreground">{distance}</span>
          )}
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        {description && (
          <CardDescription className="mt-1 flex items-start gap-1.5">
            <Info size={16} className="mt-0.5 text-muted-foreground" />
            <span>{description}</span>
          </CardDescription>
        )}
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
        {!isUserEvent && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${createdBy}`} alt={createdBy} />
              <AvatarFallback>{getInitials(createdBy)}</AvatarFallback>
            </Avatar>
            <span>Created by {createdBy}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center border-t">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users size={14} />
          <span>{participants} participants</span>
        </div>
        <div className="flex gap-2">
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
