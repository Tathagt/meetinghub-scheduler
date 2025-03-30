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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStorage } from "@/contexts/StorageContext";

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
  const [searchParams] = useSearchParams();
  const rebookId = searchParams.get('rebook');
  
  const { tables, clubs, addBooking, getBookingById, currentUser } = useStorage();
  
  const form = useForm({
    defaultValues: {
      tableId: "",
      clubId: "",
      time: "",
      attendees: "",
      purpose: "",
    },
  });
  
  useEffect(() => {
    if (rebookId) {
      const booking = getBookingById(parseInt(rebookId));
      if (booking) {
        form.reset({
          tableId: booking.tableId.toString(),
          clubId: booking.clubId.toString(),
          time: booking.time,
          attendees: booking.attendees.toString(),
          purpose: booking.purpose,
        });
        
        if (booking.date) {
          setDate(new Date(booking.date));
        }
      }
    }
  }, [rebookId, getBookingById, form]);

  const onSubmit = (data: any) => {
    if (!currentUser) {
      toast.error("You must be logged in to create a booking");
      return;
    }
    
    if (!date) {
      toast.error("Please select a date for your booking");
      return;
    }
    
    const tableId = parseInt(data.tableId);
    const clubId = parseInt(data.clubId);
    
    const selectedTable = tables.find(t => (t.id === tableId || t._id === tableId.toString()));
    const selectedClub = clubs.find(c => (c.id === clubId || c._id === clubId.toString()));
    
    if (!selectedTable || !selectedClub) {
      toast.error("Invalid table or club selection");
      return;
    }
    
    const newBooking = {
      tableId: selectedTable._id || tableId.toString(),
      tableName: selectedTable.name,
      date: format(date, "yyyy-MM-dd"),
      time: data.time,
      clubId: selectedClub._id || clubId.toString(),
      clubName: selectedClub.name,
      purpose: data.purpose,
      status: "pending" as const,
      attendees: parseInt(data.attendees),
      location: selectedTable.location,
      userId: currentUser._id || currentUser.id || "",
    };
    
    const result = addBooking(newBooking);
    
    if (result) {
      toast.success("Booking created successfully!");
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    } else {
      toast.error("Failed to create booking");
    }
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
                name="tableId"
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
                          <SelectItem key={table._id || table.id} value={table.id?.toString() || table._id}>
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
                name="clubId"
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
                          <SelectItem key={club._id || club.id} value={club.id?.toString() || club._id}>
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
