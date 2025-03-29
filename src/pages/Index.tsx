
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Layers, Users, Clock } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { useStorage } from "@/contexts/StorageContext";

const Dashboard = () => {
  const { upcomingBookings, availableTables, tables, clubs, cancelBooking } = useStorage();
  
  // Get the 3 most recent upcoming bookings
  const recentBookings = upcomingBookings.slice(0, 3);
  
  // Today's date in YYYY-MM-DD format for filtering
  const today = new Date().toISOString().split('T')[0];
  
  // Tables available today
  const todaysTables = tables.slice(0, 5).map(table => {
    // Check if this table has any bookings for today
    const isBooked = upcomingBookings.some(
      booking => booking.tableId === table.id && booking.date === today
    );
    
    // Check if this table has any pending bookings
    const isPending = upcomingBookings.some(
      booking => booking.tableId === table.id && booking.date === today && booking.status === 'pending'
    );
    
    return {
      ...table,
      status: isBooked ? 'booked' : isPending ? 'pending' : 'available'
    };
  });

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
              <div className="text-3xl font-bold">{availableTables.length}</div>
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
              <div className="text-3xl font-bold">{clubs.length}</div>
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
              <div className="text-3xl font-bold">{upcomingBookings.length}</div>
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
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div key={booking.id} className="booking-card flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{booking.tableName}</h3>
                      <div className="text-sm text-muted-foreground">{booking.clubName}</div>
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
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming bookings
                </div>
              )}
              
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
              {todaysTables.map((table) => (
                <div key={table.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      table.status === 'available' ? 'bg-green-500' : 
                      table.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    <span>{table.name}</span>
                  </div>
                  <span className={`table-status-${table.status}`}>
                    {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                  </span>
                </div>
              ))}
              
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
