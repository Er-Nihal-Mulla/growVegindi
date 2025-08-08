
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { content as allContent } from '@/lib/content';

const signUpSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
  village: z.string().min(2, 'Village is required'),
  taluka: z.string().min(2, 'Taluka is required'),
  district: z.string().min(2, 'District is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;


function SignUpFormComponent() {
  const { signIn, setIsLoading, language } = useContext(AppContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const content = allContent[language];
  const signUpContent = content.signUp;
  
  const role = searchParams.get('role') === 'farmer' ? 'farmer' : 'customer';

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    setLoading(true);
    setIsLoading(true);
    // In a real app, this would be an async call to your backend/Firebase
    setTimeout(() => {
        const newUser: User = {
          id: String(Date.now()),
          name: data.name,
          mobile: data.mobile,
          village: data.village,
          taluka: data.taluka,
          district: data.district,
          email: '', // Email is not collected in this form
          role,
        };
        signIn(newUser);
        if (role === 'farmer') {
          router.push('/farmer/dashboard');
        } else {
          router.push('/products');
        }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {role === 'farmer' ? signUpContent.farmerTitle : signUpContent.title}
        </CardTitle>
        <CardDescription>
          {role === 'farmer' 
            ? signUpContent.farmerDescription
            : signUpContent.description}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{role === 'farmer' ? signUpContent.farmerNameLabel : signUpContent.nameLabel}</Label>
            <Input id="name" {...register('name')} disabled={loading} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mobile">{signUpContent.mobileLabel}</Label>
            <Input id="mobile" type="tel" {...register('mobile')} disabled={loading} />
            {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
          </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="village">{signUpContent.villageLabel}</Label>
              <Input id="village" {...register('village')} disabled={loading} />
              {errors.village && <p className="text-sm text-destructive">{errors.village.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taluka">{signUpContent.talukaLabel}</Label>
              <Input id="taluka" {...register('taluka')} disabled={loading} />
              {errors.taluka && <p className="text-sm text-destructive">{errors.taluka.message}</p>}
            </div>
             <div className="grid gap-2">
              <Label htmlFor="district">{signUpContent.districtLabel}</Label>
              <Input id="district" {...register('district')} disabled={loading} />
              {errors.district && <p className="text-sm text-destructive">{errors.district.message}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{signUpContent.passwordLabel}</Label>
            <Input id="password" type="password" {...register('password')} disabled={loading} />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" loading={loading}>
            {signUpContent.createAccountButton}
          </Button>
          <div className="mt-4 text-center text-sm">
            {signUpContent.alreadyHaveAccount}{' '}
            <Link href="/sign-in" className="underline" onClick={() => setIsLoading(true)}>
              {content.auth.signIn}
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}


export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-background p-4">
      <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <SignUpFormComponent />
      </Suspense>
    </div>
  );
}
