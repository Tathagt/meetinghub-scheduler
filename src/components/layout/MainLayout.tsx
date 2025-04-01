
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TableSummary from "./TableSummary";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex flex-col md:flex-row w-full">
            <main className="flex-1 p-4 md:p-6 animate-fade-in">{children}</main>
            <TableSummary className="w-full md:w-80 p-4 border-l border-border hidden md:block" />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
