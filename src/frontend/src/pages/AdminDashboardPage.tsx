import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetCallerUserProfile, useSaveCallerUserProfile, useGetAllUserProfiles, useDeleteUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Users, Loader2, Trash2, LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function AdminDashboardPage() {
  const { identity, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: allProfiles, isLoading: profilesLoading } = useGetAllUserProfiles();
  const saveProfile = useSaveCallerUserProfile();
  const deleteProfile = useDeleteUserProfile();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [name, setName] = useState('');

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/admin/login' });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && !isCheckingAdmin && isAdmin === false) {
      navigate({ to: '/admin/login' });
    }
  }, [isAuthenticated, isAdmin, isCheckingAdmin, navigate]);

  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && userProfile === null) {
      setShowProfileSetup(true);
    }
  }, [isAuthenticated, profileLoading, isFetched, userProfile]);

  const handleSaveProfile = async () => {
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      setShowProfileSetup(false);
      setName('');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleDeleteUser = async (principal: string) => {
    if (!confirm('Are you sure you want to delete this user profile?')) return;
    try {
      await deleteProfile.mutateAsync(principal as any);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (isCheckingAdmin || profileLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-[80vh] py-12 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-coral" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-charcoal dark:text-white">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {userProfile?.name || 'Administrator'}
              </p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-coral" />
                User Statistics
              </CardTitle>
              <CardDescription>Overview of registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-coral">
                {allProfiles?.length || 0}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Total registered users</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-coral" />
                Your Profile
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">{userProfile?.name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-semibold text-coral">Administrator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {profilesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-coral" />
              </div>
            ) : allProfiles && allProfiles.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Principal ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProfiles.map(([principal, profile]) => (
                    <TableRow key={principal.toString()}>
                      <TableCell className="font-medium">{profile.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {principal.toString().slice(0, 20)}...
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(principal.toString())}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center py-8 text-muted-foreground">No users registered yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showProfileSetup} onOpenChange={setShowProfileSetup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              Please enter your name to complete your admin profile setup.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={!name.trim() || saveProfile.isPending}
              className="bg-coral hover:bg-coral-dark"
            >
              {saveProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
