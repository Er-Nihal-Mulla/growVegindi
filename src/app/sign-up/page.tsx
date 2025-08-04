
'use client';

import { useContext, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppContext } from '@/context/app-context';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

function SignUpFormComponent() {
  const { signIn, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const role = searchParams.get('role') === 'farmer' ? 'farmer' : 'customer';

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);
    // In a real app, this would be an async call
    setTimeout(() => {
        const newUser: User = {
          id: String(Date.now()),
          name,
          email,
          role,
        };
        signIn(newUser);
        if (role === 'farmer') {
          router.push('/farmer/dashboard');
        } else {
          router.push('/products');
        }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {role === 'farmer' ? 'Farmer Sign Up' : 'Sign Up'}
        </CardTitle>
        <CardDescription>
          {role === 'farmer' 
            ? 'Create an account to start selling your produce.'
            : 'Create an account to get started.'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{role === 'farmer' ? 'Farm Name / Your Name' : 'Name'}</Label>
            <Input
              id="name"
              type="text"
              placeholder={role === 'farmer' ? "Ram's Farm" : "Your Name"}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
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
            Create Account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/sign-in" className="underline" onClick={() => setIsLoading(true)}>
              Sign In
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}


export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background">
      <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <SignUpFormComponent />
      </Suspense>
    </div>
  );
}
