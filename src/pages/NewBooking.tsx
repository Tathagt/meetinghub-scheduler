
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock data for tables
const tables = [
  { id: 1, name: "Conference Room A", capacity: 12 },
  { id: 2, name: "Meeting Room B", capacity: 8 },
  { id: 3, name: "Study Hall C", capacity: 20 },
  { id: 4, name: "Discussion Room D", capacity: 6 },
  { id: 5, name: "Collaboration Space E", capacity: 15 },
  { id: 6, name: "Seminar Room F", capacity: 30 },
];

// Mock data for clubs
const clubs = [
  { id: 1, name: "Tech Club" },
  { id: 2, name: "Art Society" },
  { id: 3, name: "Debate Club" },
  { id: 4, name: "Photography Club" },
  { id: 5, name: "Robotics Team" },
  { id: 6, name: "Business Club" },
];

// Time slots
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

const NewBookingPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  const form = useForm({
    defaultValues: {
      table: "",
      club: "",
      time: "",
      attendees: "",
      purpose: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      date: date ? format(date, "yyyy-MM-dd") : "",
    });

    toast.success("Booking created successfully!");
    setTimeout(() => {
      navigate("/bookings");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">New Booking</h1>
        <p className="text-muted-foreground">Create a new table reservation</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
          <CardDescription>
            Fill out the form below to book a table for your club meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="table"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Table</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a table" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem key={table.id} value={table.id.toString()}>
                            {table.name} (Capacity: {table.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a table that fits your group size
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="club"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your club" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.id.toString()}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select the date for your booking
                  </FormDescription>
                </FormItem>

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot">
                              <span className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                {field.value || "Select a time slot"}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Attendees</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        placeholder="Enter number of attendees" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Please ensure this doesn't exceed table capacity
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Purpose</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly describe the purpose of this meeting" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between px-0 pt-5">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">Create Booking</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default NewBookingPage;
