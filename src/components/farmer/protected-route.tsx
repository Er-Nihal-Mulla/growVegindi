
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import { Loader2 } from 'lucide-react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isLoading, setIsLoading, isGuest } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // We want to run this check regardless of the initial `isLoading` state
    // from the context, as this component's job is to decide if we should
    // even be on this page.
    if (!isAuthenticated && !isGuest) {
      router.replace('/sign-in');
      return;
    }
    
    if(isGuest || user?.role !== 'farmer'){
        router.replace('/unauthorized')
        return;
    }
   
    // If all checks pass, we can turn off the loader.
    setIsLoading(false);
  }, [isAuthenticated, user, router, setIsLoading, isGuest]);


  // Show a loader while we are verifying auth state.
  if (isLoading || !isAuthenticated || user?.role !== 'farmer' || isGuest) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
