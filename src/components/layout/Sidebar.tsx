
import { 
  CalendarDays, 
  CircleUser, 
  ClipboardCheck, 
  Home, 
  Layers, 
  MessageSquare, 
  Settings, 
  Users 
} from "lucide-react";
import { 
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Tables",
    path: "/tables",
    icon: Layers,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: CalendarDays,
  },
  {
    title: "My Reservations",
    path: "/my-bookings",
    icon: ClipboardCheck,
  },
];

const adminItems = [
  {
    title: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <SidebarContainer className="border-r border-border">
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-lg w-8 h-8 flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">TableBook</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <CircleUser className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
