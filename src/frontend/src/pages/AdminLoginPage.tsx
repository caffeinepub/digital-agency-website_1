import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login, identity, loginStatus, isLoggingIn } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin, isFetched } = useIsCallerAdmin();
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated && isFetched && isAdmin) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [isAuthenticated, isAdmin, isFetched, navigate]);

  useEffect(() => {
    if (isAuthenticated && isFetched && !isAdmin) {
      setError('Access denied. You do not have admin privileges.');
    }
  }, [isAuthenticated, isAdmin, isFetched]);

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const isLoading = isLoggingIn || (isAuthenticated && checkingAdmin);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            Secure login required to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-coral" />
              <p className="text-sm text-muted-foreground">
                {isLoggingIn ? 'Authenticating...' : 'Verifying admin access...'}
              </p>
            </div>
          ) : !isAuthenticated ? (
            <Button
              onClick={handleLogin}
              className="w-full bg-coral hover:bg-coral-dark text-white font-semibold"
              size="lg"
            >
              Login with Internet Identity
            </Button>
          ) : null}

          <div className="text-center text-sm text-muted-foreground">
            <p>Only authorized administrators can access this area.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
