
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Layers, Users, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";

// Mock data
const upcomingBookings = [
  {
    id: 1,
    tableName: "Conference Room A",
    date: "2023-09-15",
    time: "14:00 - 16:00",
    status: "confirmed",
    club: "Tech Club"
  },
  {
    id: 2,
    tableName: "Meeting Room B",
    date: "2023-09-16",
    time: "10:00 - 11:30",
    status: "pending",
    club: "Art Society"
  },
  {
    id: 3,
    tableName: "Study Hall C",
    date: "2023-09-17",
    time: "15:00 - 17:00",
    status: "confirmed",
    club: "Debate Club"
  }
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Table Slot Booking Portal</p>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <Layers className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Clubs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24</div>
              <Users className="h-6 w-6 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">8</div>
              <Calendar className="h-6 w-6 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reservations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="booking-card flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{booking.tableName}</h3>
                    <div className="text-sm text-muted-foreground">{booking.club}</div>
                    <div className="flex items-center mt-1 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{booking.date}</span>
                      <Clock className="h-4 w-4 mx-1 ml-2" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
              
              <div className="text-center pt-2">
                <Button variant="outline" asChild>
                  <Link to="/my-bookings">View All Bookings</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Table Availability Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Conference Room A</span>
                </div>
                <span className="table-status-available">Available</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Meeting Room B</span>
                </div>
                <span className="table-status-booked">Booked</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span>Study Hall C</span>
                </div>
                <span className="table-status-pending">Pending</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Discussion Room D</span>
                </div>
                <span className="table-status-available">Available</span>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-border rounded-md">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Collaboration Space E</span>
                </div>
                <span className="table-status-available">Available</span>
              </div>
              
              <div className="text-center pt-2">
                <Button variant="outline" asChild>
                  <Link to="/tables">View All Tables</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
