
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, Calendar, Info } from 'lucide-react';
import { useToast } from "@/hooks/useToast";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MediaUpload from '../../components/MediaUpload/MediaUpload';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { SystemRoutes } from '@/modules/routing/routing.types';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["medical", "donation", "volunteer", "other"]),
  description: z.string().min(1, "Description is required"),
  mediaFiles: z.array(z.any()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      date: "",
      time: "",
      type: "volunteer",
      description: "",
      mediaFiles: [],
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const onSubmit = (data: FormValues) => {
    console.log('Event data:', data);
    
    // In a real app, you would upload the files to a server
    // and then save the event data with the file URLs
    
    toast({
      title: "Event Created",
      description: "Your event has been created successfully!",
    });
    
    navigate(SystemRoutes.Dashboard);
  };

  return (
    <PageWrapper>
      
      <div >
        <div>
          <h1>Create New Event</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          <MapPin size={16} />
                          Location
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                        >
                          <option value="medical">Medical</option>
                          <option value="donation">Donation</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          <Calendar size={16} />
                          Date
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        <Info size={16} />
                        Description
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your event..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mediaFiles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photos & Videos (Optional)</FormLabel>
                    <FormControl>
                      <MediaUpload
                        maxFiles={5}
                        value={field.value || []}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(SystemRoutes.Dashboard)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CreateEvent;
