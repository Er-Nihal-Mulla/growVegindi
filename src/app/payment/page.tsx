
'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import { IndianRupee, ShieldCheck } from 'lucide-react';
import type { SignUpFormValues } from '../sign-up/page';

export default function PaymentPage() {
  const { signUpAndSignIn, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<SignUpFormValues & { role: 'farmer' | 'customer' } | null>(null);

  useEffect(() => {
    setIsLoading(false);
    const storedUser = localStorage.getItem('pending_user');
    if (storedUser) {
      setPendingUser(JSON.parse(storedUser));
    } else {
      // If there's no pending user, they shouldn't be here
      toast({
        title: 'Error',
        description: 'No registration data found. Please sign up again.',
        variant: 'destructive',
      });
      router.replace('/sign-up');
    }
  }, [router, toast, setIsLoading]);

  const handlePaymentSuccess = () => {
    if (!pendingUser) return;

    setLoading(true);
    setIsLoading(true);

    // Simulate API call and account creation
    setTimeout(() => {
      const paymentDetails = {
        transactionId: `txn_${Date.now()}`,
        paymentDate: new Date().toISOString(),
        amount: 350.00,
      };

      signUpAndSignIn(pendingUser, paymentDetails);
      localStorage.removeItem('pending_user');

      toast({
        title: 'Registration Successful!',
        description: 'Your account has been created.',
      });

      if (pendingUser.role === 'farmer') {
        router.push('/farmer/dashboard');
      } else {
        router.push('/products');
      }
    }, 1500);
  };

  const handlePaymentCancel = () => {
    localStorage.removeItem('pending_user');
    toast({
        title: 'Payment Cancelled',
        description: 'Your registration was not completed.',
        variant: 'destructive',
    })
    router.push('/sign-up');
  };

  if (!pendingUser) {
    return null; // Or a loader
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Image
            src="https://razorpay.com/assets/razorpay-logo.svg"
            alt="Razorpay"
            width={120}
            height={40}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-headline">Complete Your Registration</CardTitle>
          <CardDescription>A one-time fee is required to activate your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center text-lg p-4 bg-secondary/30 rounded-lg">
            <span>Registration Fee</span>
            <span className="font-bold flex items-center">
              <IndianRupee className="h-5 w-5" /> 350.00
            </span>
          </div>
           <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-500"/>
            <span>Secure payment powered by Razorpay</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" size="lg" onClick={handlePaymentSuccess} loading={loading}>
            Pay Now
          </Button>
          <Button variant="ghost" className="w-full" onClick={handlePaymentCancel} disabled={loading}>
            Cancel Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
