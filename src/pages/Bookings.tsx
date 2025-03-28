
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarDays, Clock, Filter, MapPin, Plus, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for bookings
const bookings = [
  {
    id: 1,
    tableName: "Conference Room A",
    date: "2023-09-15",
    time: "14:00 - 16:00",
    clubName: "Tech Club",
    purpose: "Weekly Meeting",
    status: "confirmed",
    attendees: 8,
    location: "Main Building, Floor 1",
  },
  {
    id: 2,
    tableName: "Meeting Room B",
    date: "2023-09-16",
    time: "10:00 - 11:30",
    clubName: "Art Society",
    purpose: "Project Discussion",
    status: "pending",
    attendees: 5,
    location: "Main Building, Floor 2",
  },
  {
    id: 3,
    tableName: "Study Hall C",
    date: "2023-09-17",
    time: "15:00 - 17:00",
    clubName: "Debate Club",
    purpose: "Competition Prep",
    status: "confirmed",
    attendees: 12,
    location: "Library Building, Floor 3",
  },
  {
    id: 4,
    tableName: "Discussion Room D",
    date: "2023-09-18",
    time: "13:00 - 14:30",
    clubName: "Photography Club",
    purpose: "Portfolio Review",
    status: "confirmed",
    attendees: 6,
    location: "Student Center, Floor 1",
  },
  {
    id: 5,
    tableName: "Collaboration Space E",
    date: "2023-09-19",
    time: "11:00 - 13:00",
    clubName: "Robotics Team",
    purpose: "Project Planning",
    status: "cancelled",
    attendees: 10,
    location: "Innovation Hub, Floor 2",
  },
  {
    id: 6,
    tableName: "Seminar Room F",
    date: "2023-09-20",
    time: "16:00 - 18:00",
    clubName: "Business Club",
    purpose: "Guest Speaker",
    status: "confirmed",
    attendees: 25,
    location: "Academic Building, Floor 3",
  },
];

const BookingsPage = () => {
  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground">Manage table reservations</p>
        </div>
        <Button asChild>
          <Link to="/bookings/new">
            <Plus className="mr-2 h-4 w-4" /> New Booking
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className={`h-1 ${
                  booking.status === "confirmed" ? "bg-green-500" :
                  booking.status === "pending" ? "bg-amber-500" :
                  "bg-red-500"
                }`} />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{booking.tableName}</CardTitle>
                      <CardDescription>{booking.clubName}</CardDescription>
                    </div>
                    <Badge variant={
                      booking.status === "confirmed" ? "default" :
                      booking.status === "pending" ? "outline" :
                      "destructive"
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{booking.attendees} Attendees</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Purpose:</div>
                      <div className="text-sm">{booking.purpose}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/bookings/${booking.id}`}>View Details</Link>
                  </Button>
                  {booking.status !== "cancelled" && (
                    <Button variant="secondary" size="sm">
                      Manage Booking
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          {/* Content will be dynamically filtered */}
        </TabsContent>
        <TabsContent value="past">
          {/* Content will be dynamically filtered */}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default BookingsPage;
