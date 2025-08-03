
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { AppProvider, AppContext } from '@/context/app-context';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { useContext } from 'react';
import { Loader2 } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Grow Vejindi - Nurturing Growth',
//   description: 'An e-commerce platform for Indian farmers and local buyers.',
// };

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}


function AppBody({ children }: { children: React.ReactNode }) {
  const { isLoading } = useContext(AppContext);

  return (
    <body className={cn('min-h-screen bg-background font-body antialiased')}>
        {isLoading && <FullScreenLoader />}
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
    </body>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Grow Vejindi - Nurturing Growth</title>
        <meta name="description" content="An e-commerce platform for Indian farmers and local buyers." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@24..144,700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <AppProvider>
        <AppBody>{children}</AppBody>
      </AppProvider>
    </html>
  );
}
