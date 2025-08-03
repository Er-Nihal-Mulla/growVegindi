
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
        router.replace('/unauthorized');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, user, router, isLoading, setIsLoading]);

  if (isLoading || !isAuthenticated || user?.role !== 'farmer') {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
