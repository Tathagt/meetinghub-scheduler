
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useStorage } from "@/contexts/StorageContext";

const TablesPage = () => {
  const { tables } = useStorage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [viewType, setViewType] = useState("all");

  const filteredTables = viewType === "available" 
    ? tables.filter(table => table.availableSlots > 0)
    : viewType === "booked" 
      ? tables.filter(table => table.availableSlots === 0)
      : tables;

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tables</h1>
          <p className="text-muted-foreground">Browse and book available tables</p>
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0 z-50">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <Button asChild>
            <Link to="/bookings/new">Book a Table</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setViewType("all")}>All Tables</TabsTrigger>
            <TabsTrigger value="available" onClick={() => setViewType("available")}>Available</TabsTrigger>
            <TabsTrigger value="booked" onClick={() => setViewType("booked")}>Fully Booked</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTables.map((table) => (
              <Card key={table._id || table.id} className="overflow-hidden">
                <div className={cn(
                  "h-2",
                  table.availableSlots === 0 ? "bg-red-500" : 
                  table.availableSlots < table.totalSlots / 2 ? "bg-amber-500" : "bg-green-500"
                )} />
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <span>{table.name}</span>
                    <span className="text-sm font-normal bg-muted rounded-full px-2 py-1">
                      {table.capacity} people
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div>{table.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Features</div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {table.features.map((feature, index) => (
                          <span key={index} className="bg-muted text-xs rounded-full px-2 py-1">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Availability</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div 
                            className={cn(
                              "h-2.5 rounded-full",
                              table.availableSlots === 0 ? "bg-red-500" : 
                              table.availableSlots < table.totalSlots / 2 ? "bg-amber-500" : "bg-green-500"
                            )}
                            style={{ width: `${(table.availableSlots / table.totalSlots) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          {table.availableSlots}/{table.totalSlots} slots
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/tables/${table._id || table.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="available" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This content will be dynamically shown based on the filtered tables */}
          </div>
        </TabsContent>
        <TabsContent value="booked" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* This content will be dynamically shown based on the filtered tables */}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default TablesPage;
