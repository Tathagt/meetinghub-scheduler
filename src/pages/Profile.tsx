import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MainLayout from "@/components/layout/MainLayout";
import { useApi } from "@/contexts/ApiContext";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { currentUser, logout } = useApi();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  
  const handleSaveProfile = () => {
    // In a real app, this would call an API to update the user profile
    toast.success("Profile updated successfully");
  };
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    // Redirect would happen here
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Your full name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email address" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select disabled defaultValue={currentUser?.role || "student"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="coordinator">Club Coordinator</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Your role determines your permissions in the system
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="#change-password">Change Password</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="#notifications">Notification Settings</a>
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                Log Out
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Club Information</CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser?.clubId ? (
                <div>
                  <p className="font-medium">Club ID: {currentUser.clubId}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You are registered as a member of this club
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You are not associated with any club
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
