
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock data for tables - using the same data as in Tables.tsx
const tables = [
  {
    id: 1,
    name: "HALL 1",
    capacity: 17,
    features: ["BY OUR OWN"],
    location: "Building TECH PARK 2",
    availableSlots: 10,
    totalSlots: 10,
  },
  {
    id: 2,
    name: "HALL 2",
    capacity: 18,
    features: ["BY OUR OWN"],
    location: "Building TECH PARK 2",
    availableSlots: 10,
    totalSlots: 10,
  },
];

interface TableSummaryProps {
  className?: string;
}

const TableSummary = ({ className }: TableSummaryProps) => {
  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Available Tables</h3>
        <p className="text-sm text-muted-foreground">Quick overview of tables</p>
      </div>
      
      <div className="space-y-3">
        {tables.map((table) => (
          <Card key={table.id} className="overflow-hidden">
            <div className={cn(
              "h-1",
              table.availableSlots === 0 ? "bg-red-500" : 
              table.availableSlots < table.totalSlots / 2 ? "bg-amber-500" : "bg-green-500"
            )} />
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex justify-between">
                <span>{table.name}</span>
                <span className="text-xs font-normal bg-muted rounded-full px-2 py-0.5">
                  {table.capacity} people
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 text-sm">
              <div className="text-xs text-muted-foreground mb-1">Location</div>
              <div className="text-xs mb-2">{table.location}</div>
              
              <div className="text-xs text-muted-foreground mb-1">Availability</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={cn(
                      "h-1.5 rounded-full",
                      table.availableSlots === 0 ? "bg-red-500" : 
                      table.availableSlots < table.totalSlots / 2 ? "bg-amber-500" : "bg-green-500"
                    )}
                    style={{ width: `${(table.availableSlots / table.totalSlots) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs whitespace-nowrap">
                  {table.availableSlots}/{table.totalSlots}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/tables">View All Tables</Link>
        </Button>
      </div>
    </div>
  );
};

export default TableSummary;
