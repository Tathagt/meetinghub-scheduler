
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Info, MapPin, MoreVertical, Trash, Edit } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useStorage } from "@/contexts/StorageContext";

const MyBookingsPage = () => {
  const { userBookings, cancelBooking, currentUser } = useStorage();
  
  const upcomingBookings = userBookings.filter(booking => booking.status !== "cancelled");
  const cancelledBookings = userBookings.filter(booking => booking.status === "cancelled");
  
  const handleCancelBooking = (id: number) => {
    const result = cancelBooking(id);
    if (result) {
      toast.info("Booking cancellation successful", {
        description: "Your booking has been cancelled.",
      });
    } else {
      toast.error("Failed to cancel booking", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted-foreground">Manage your reservations</p>
        </div>
        <Button asChild>
          <Link to="/bookings/new">Create New Booking</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className={`h-1 ${
                    booking.status === "confirmed" ? "bg-green-500" : "bg-amber-500"
                  }`} />
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl font-bold">{booking.tableName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{booking.clubName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                        {booking.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to={`/bookings/${booking.id}`}>
                              <Info className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to={`/bookings/${booking.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Booking</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer text-destructive focus:text-destructive"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Cancel Booking</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm text-muted-foreground mb-1">Purpose:</p>
                        <p className="text-sm">{booking.purpose}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/bookings/${booking.id}`}>Details</Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">You don't have any upcoming bookings.</p>
                <Button className="mt-4" asChild>
                  <Link to="/bookings/new">Book a Table</Link>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-10">
            <p className="text-muted-foreground">You don't have any past bookings yet.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden opacity-75">
                  <div className="h-1 bg-red-500" />
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl font-bold">{booking.tableName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{booking.clubName}</p>
                    </div>
                    <Badge variant="destructive">Cancelled</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link to={`/bookings/new?rebook=${booking.id}`}>
                          Book Again
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">You don't have any cancelled bookings.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default MyBookingsPage;
