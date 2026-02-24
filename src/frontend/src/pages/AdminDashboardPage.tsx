import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useGetAllInquiries,
  useGetAllUserProfiles,
  useDeleteInquiry,
  useDeleteUserProfile,
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, Mail, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import InquiryList from '../components/InquiryList';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clear, identity } = useInternetIdentity();
  const { data: inquiries, isLoading: loadingInquiries } = useGetAllInquiries();
  const { data: userProfiles, isLoading: loadingUsers } = useGetAllUserProfiles();
  const { data: currentProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const deleteInquiryMutation = useDeleteInquiry();
  const deleteUserMutation = useDeleteUserProfile();
  const saveProfileMutation = useSaveCallerUserProfile();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileName, setProfileName] = useState('');

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/admin' });
  };

  const handleDeleteInquiry = async (id: bigint) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      await deleteInquiryMutation.mutateAsync(id);
    }
  };

  const handleDeleteUser = async (principal: string) => {
    if (confirm('Are you sure you want to delete this user profile?')) {
      await deleteUserMutation.mutateAsync(principal);
    }
  };

  const handleSaveProfile = async () => {
    if (profileName.trim()) {
      await saveProfileMutation.mutateAsync({ name: profileName.trim() });
      setShowProfileSetup(false);
    }
  };

  // Show profile setup dialog if user doesn't have a profile yet
  if (!profileLoading && isFetched && currentProfile === null && !showProfileSetup) {
    setShowProfileSetup(true);
  }

  const adminName = currentProfile?.name || 'Admin';

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-charcoal dark:text-white">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {adminName}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Contact form submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProfiles?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Registered user profiles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Role</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Admin</div>
              <p className="text-xs text-muted-foreground">Full access privileges</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inquiries" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Inquiries</CardTitle>
                <CardDescription>
                  Manage all inquiries submitted through the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingInquiries ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-coral" />
                  </div>
                ) : (
                  <InquiryList
                    inquiries={inquiries || []}
                    onDelete={handleDeleteInquiry}
                    isDeleting={deleteInquiryMutation.isPending}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Profiles</CardTitle>
                <CardDescription>
                  Manage registered user profiles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-coral" />
                  </div>
                ) : userProfiles && userProfiles.length > 0 ? (
                  <div className="space-y-4">
                    {userProfiles.map(([principal, profile]) => (
                      <div
                        key={principal.toString()}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{profile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {principal.toString().slice(0, 20)}...
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(principal.toString())}
                          disabled={
                            deleteUserMutation.isPending ||
                            principal.toString() === identity?.getPrincipal().toString()
                          }
                        >
                          {deleteUserMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Delete'
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No user profiles found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome, Admin!</DialogTitle>
            <DialogDescription>
              Please set up your profile name to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={!profileName.trim() || saveProfileMutation.isPending}
              className="bg-coral hover:bg-coral-dark text-white"
            >
              {saveProfileMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
