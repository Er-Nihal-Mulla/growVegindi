
'use client';

import { useState, useContext, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';

type WaitlistInput = z.infer<ReturnType<typeof getWaitlistSchema>>;

const getWaitlistSchema = (content: (typeof allContent)['en']['notify']) => z.object({
  name: z.string().min(2, content.nameError),
  email: z.string().email(content.emailError).optional().or(z.literal('')),
  mobile: z.string().regex(/^[0-9]{10}$/, content.mobileError),
});


function NotifyForm() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { language } = useContext(AppContext);
  const content = allContent[language].notify;
  
  const waitlistSchema = useMemo(() => getWaitlistSchema(content), [content]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    // Re-validate on language change
    context: { language },
  });

  const onWaitlistSubmit: SubmitHandler<WaitlistInput> = async (data) => {
    try {
      const response = await fetch('/api/add-to-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        reset();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
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
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{content.title}</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          {content.subtitle}
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-6 bg-green-500/20 rounded-lg max-w-md mx-auto">
            <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold">{content.successTitle}</h3>
            <p>{content.successSubtitle}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onWaitlistSubmit)} className="flex flex-col gap-4 max-w-md mx-auto">
            <div className="w-full">
              <Input
                {...register('name')}
                placeholder={content.namePlaceholder}
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="text-destructive text-left mt-1 text-sm">{errors.name.message}</p>}
            </div>

            <div className="w-full">
              <Input
                {...register('email')}
                type="email"
                placeholder={content.emailPlaceholder}
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="text-destructive text-left mt-1 text-sm">{errors.email.message}</p>}
            </div>

            <div className="w-full">
              <Input
                {...register('mobile')}
                type="tel"
                placeholder={content.mobilePlaceholder}
                className="bg-primary-foreground text-primary placeholder:text-primary/70"
                aria-invalid={errors.mobile ? 'true' : 'false'}
              />
              {errors.mobile && <p className="text-destructive text-left mt-1 text-sm">{errors.mobile.message}</p>}
            </div>

            <Button type="submit" size="lg" variant="secondary" loading={isSubmitting}>
              {isSubmitting ? content.submittingText : content.buttonText}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

export default NotifyForm;
