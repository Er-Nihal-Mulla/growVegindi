
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace('/sign-in');
      } else if (user?.role !== 'farmer') {
        router.replace('/products'); // Or a generic dashboard/home page
      }
    }
  }, [isAuthenticated, user, router, isLoading]);

  // While checking auth state, show a loader
  if (isLoading || !isAuthenticated || user?.role !== 'farmer') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  // If authenticated and is a farmer, render the children
  return <>{children}</>;
}
