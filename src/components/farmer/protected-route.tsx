
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading, setIsLoading } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/sign-in');
      } else if (user?.role !== 'farmer') {
        // Redirect non-farmers away
        router.replace('/'); 
      }
    }
  }, [isAuthenticated, user, router, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (isLoading || !isAuthenticated || user?.role !== 'farmer') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
