
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading, setIsLoading } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // This effect handles redirection based on auth state and user role
    if (!isLoading) {
      if (!isAuthenticated) {
        // If not authenticated at all, redirect to sign-in
        router.replace('/sign-in');
      } else if (user?.role !== 'farmer') {
        // If authenticated but not a farmer (could be customer or guest),
        // redirect away from the farmer-specific area.
        router.replace('/products'); // Redirecting to products page is a safe default
      }
    }
  }, [isAuthenticated, user, router, isLoading]);

  useEffect(() => {
    // This effect ensures the loading spinner is turned off once the component mounts
    // and the redirection logic has had a chance to run.
    if (user?.role === 'farmer') {
        setIsLoading(false);
    }
  }, [setIsLoading, user]);


  // Show a loader while checking authentication and role.
  // This prevents a flash of the protected content before redirection.
  if (isLoading || !isAuthenticated || user?.role !== 'farmer') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // If all checks pass, render the protected content.
  return <>{children}</>;
}
