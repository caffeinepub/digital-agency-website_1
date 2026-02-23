import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useLogin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const loginMutation = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identity) {
      setError('Please authenticate with Internet Identity first');
      return;
    }

    const userPrincipal = identity.getPrincipal();

    console.log('[AdminLoginPage] Form submitted');
    console.log('[AdminLoginPage] Username:', username);
    console.log('[AdminLoginPage] Password length:', password.length);
    console.log('[AdminLoginPage] User principal:', userPrincipal.toString());

    try {
      console.log('[AdminLoginPage] Calling login mutation...');
      await loginMutation.mutateAsync({ username, password, userPrincipal });
      console.log('[AdminLoginPage] Login mutation successful, navigating to dashboard...');
      navigate({ to: '/admin/dashboard' });
    } catch (error: any) {
      console.error('[AdminLoginPage] Login error:', error);
      console.error('[AdminLoginPage] Error message:', error.message);
      
      // Extract meaningful error message
      let errorMessage = 'Invalid credentials. Please try again.';
      if (error.message && error.message.includes('Invalid credentials')) {
        errorMessage = 'Invalid credentials. Please try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('[AdminLoginPage] Displaying error:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-coral" />
          </div>
          <CardTitle className="text-3xl font-bold">Admin Access</CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoggingIn || isCheckingAdmin || loginMutation.isPending}
              className="w-full h-12 text-base font-semibold bg-coral hover:bg-coral-dark transition-all duration-300"
              size="lg"
            >
              {isLoggingIn || isCheckingAdmin || loginMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center">
            Default credentials: admin / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
