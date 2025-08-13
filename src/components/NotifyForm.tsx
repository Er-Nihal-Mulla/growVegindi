'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Firebase imports
import { db } from '@/firebase'; // make sure you have firebase.ts configured
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
});

type WaitlistInput = z.infer<typeof waitlistSchema>;

export function NotifyForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const onWaitlistSubmit: SubmitHandler<WaitlistInput> = async (data) => {
    try {
      await addDoc(collection(db, 'waitlist'), {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        createdAt: serverTimestamp(),
      });
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section id="notify" className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <Send className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">We’re Launching Soon!</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Be the first to know when we go live. Join our waitlist for exclusive updates.
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-6 bg-green-500/20 rounded-lg max-w-md mx-auto">
            <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold">Thank you for your interest!</h3>
            <p>You're on the list. We'll notify you at launch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onWaitlistSubmit)} className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="w-full">
              <Input
                {...register('name')}
                placeholder="Your Name"
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="text-destructive text-left mt-1 text-sm">{errors.name.message}</p>}
            </div>

            <div className="w-full">
              <Input
                {...register('email')}
                type="email"
                placeholder="Your Email Address"
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-destructive text-left mt-1 text-sm">{errors.email.message}</p>}
            </div>

            <div className="w-full">
              <Input
                {...register('mobile')}
                type="tel"
                placeholder="Your Mobile Number"
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.mobile ? 'true' : 'false'}
              />
              {errors.mobile && <p className="text-destructive text-left mt-1 text-sm">{errors.mobile.message}</p>}
            </div>

            <Button type="submit" size="lg" variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
