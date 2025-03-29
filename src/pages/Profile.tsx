
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/contexts/ApiContext";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Loader2, User } from "lucide-react";

const ProfilePage = () => {
  const { currentUser } = useApi();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect to login if no user
  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    setIsLoading(true);
    // This would typically call an API to update the user profile
    // For now we'll just simulate a successful update
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    }, 500);
  };

  return (
    <MainLayout>
      <div className="container max-w-2xl py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <CardDescription>
              View and manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                {isEditing ? (
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50">
                    {currentUser.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <div className="p-2 border rounded-md bg-muted/50">
                    {currentUser.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="p-2 border rounded-md bg-muted/50">
                  {currentUser.role}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
