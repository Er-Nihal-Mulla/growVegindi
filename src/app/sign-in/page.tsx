
'use client';

import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppContext } from '@/context/app-context';
import type { User } from '@/lib/types';

export default function SignInPage() {
  const { signIn, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);
    // In a real app, this would be an async call.
    // We'll simulate a login and randomly assign a role for demonstration.
    setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'Test User',
          email: email,
          // In a real app, you'd fetch the user's role from your backend
          role: Math.random() > 0.5 ? 'farmer' : 'customer'
        };
        signIn(mockUser);
        
        if (mockUser.role === 'farmer') {
            router.push('/farmer/dashboard');
        } else {
            router.push('/products');
        }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="underline" onClick={() => setIsLoading(true)}>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
