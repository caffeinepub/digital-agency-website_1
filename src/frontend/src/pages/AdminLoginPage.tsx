import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, identity, loginStatus } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate({ to: '/admin/dashboard' });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
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
            Secure authentication required to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isAuthenticated && !isAdmin && !isCheckingAdmin && (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
              You don't have admin privileges. Please contact the administrator.
            </div>
          )}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn || isCheckingAdmin}
            className="w-full h-12 text-base font-semibold bg-coral hover:bg-coral-dark transition-all duration-300"
            size="lg"
          >
            {isLoggingIn || isCheckingAdmin ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-5 w-5" />
                Login with Internet Identity
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            This system uses Internet Computer's secure authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
