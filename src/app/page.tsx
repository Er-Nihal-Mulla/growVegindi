
'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Leaf, Handshake, IndianRupee, Award, Rocket, LineChart, Target, DollarSign, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import heroImage from '../assets/mobileApp.png'
import visionSlide1 from '../assets/visionSlide1.png'
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addToWaitlist, AddToWaitlistInput } from '@/ai/flows/waitlist-flow';
import { useToast } from '@/hooks/use-toast';


const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
});

export default function HomePage() {
  const { language, setIsLoading } = useContext(AppContext);
  const { toast } = useToast();
  const content = allContent[language];
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddToWaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const onWaitlistSubmit: SubmitHandler<AddToWaitlistInput> = async (data) => {
    try {
      await addToWaitlist(data);
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };


  const benefits = [
    { icon: Leaf, text: content.whyChooseUs.points[0] },
    { icon: Handshake, text: content.whyChooseUs.points[1] },
    { icon: IndianRupee, text: content.whyChooseUs.points[2] },
    { icon: Award, text: content.whyChooseUs.points[3] },
  ];
  
  const features = [
    { icon: Target, title: "Sell Directly to Buyers", description: "Cut out the middleman and connect with customers in your area who are looking for fresh, local produce." },
    { icon: DollarSign, title: "Set Your Own Prices", description: "You have the freedom to set fair prices for your products, ensuring you get the compensation you deserve." },
    { icon: LineChart, title: "Grow Your Farm Income", description: "By reaching a wider customer base and controlling your prices, you can significantly increase your earnings." }
  ]

  const visionImages = [
    { src: heroImage, alt: 'Illustration of a bridge connecting farms to a city', hint: 'farm city' },
    { src: visionSlide1, alt: 'A happy family receiving a box of fresh vegetables', hint: 'happy family' },
    { src: heroImage, alt: 'A farmer using a tablet to manage their crops', hint: 'farmer technology' },
  ];
  
  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com', icon: 'https://cdn.worldvectorlogo.com/logos/instagram-2-1.svg' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'https://cdn.worldvectorlogo.com/logos/facebook-3.svg' },
    { name: 'WhatsApp', url: 'https://whatsapp.com', icon: 'https://cdn.worldvectorlogo.com/logos/whatsapp-3.svg' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src={heroImage}
            alt="A smiling Indian farmer holding fresh produce in a field"
            data-ai-hint="smiling farmer produce"
            fill
            className="absolute z-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              {content.hero.subtitle}
            </p>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                                <feature.icon className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">{content.whatWeDo.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.whatWeDo.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-4">
                     <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">{content.whyChooseUs.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <benefit.icon className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">{benefit.text}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section id="vision" className="py-16 md:py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <Carousel 
                className="w-full max-w-lg mx-auto"
                plugins={[
                    Autoplay({
                      delay: 3000,
                      stopOnInteraction: true,
                    }),
                  ]}
               >
                <CarouselContent>
                  {visionImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-0 rounded-lg overflow-hidden">
                             <Image
                                src={image.src}
                                alt={image.alt}
                                data-ai-hint={image.hint}
                                width={600}
                                height={400}
                                className="object-cover"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">{content.ourVision.title}</h2>
              <p className="text-lg leading-relaxed">{content.ourVision.text}</p>
            </div>
          </div>
        </section>
        
         {/* "Coming Soon" Section */}
        <section id="notify" className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Send className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">We’re Launching Soon!</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Be the first to know when we go live. Join our waitlist for exclusive updates.</p>
            
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
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                       {errors.name && <p className="text-destructive text-left mt-1 text-sm">{errors.name.message}</p>}
                    </div>
                     <div className="w-full">
                      <Input 
                        {...register('email')}
                        type="email" 
                        placeholder="Your Email Address" 
                        className="bg-primary-foreground text-primary placeholder:text-primary/70"
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && <p className="text-destructive text-left mt-1 text-sm">{errors.email.message}</p>}
                    </div>
                     <div className="w-full">
                      <Input 
                        {...register('mobile')}
                        type="tel" 
                        placeholder="Your Mobile Number" 
                        className="bg-primary-foreground text-primary placeholder:text-primary/70"
                        aria-invalid={errors.mobile ? "true" : "false"}
                      />
                      {errors.mobile && <p className="text-destructive text-left mt-1 text-sm">{errors.mobile.message}</p>}
                    </div>
                    <Button type="submit" size="lg" variant="secondary" loading={isSubmitting}>Notify Me</Button>
                </form>
            )}

          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{content.cta.title}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">{content.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products">
                <Button size="lg" variant="default" onClick={() => setIsLoading(true)}>{content.buttons.shopNow}</Button>
              </Link>
              <Link href="/sign-up?role=farmer">
                <Button size="lg" variant="outline" className="bg-transparent hover:bg-background/20" onClick={() => setIsLoading(true)}>{content.buttons.registerFarmer}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Image src={link.icon} alt={link.name} width={24} height={24} className="opacity-70 hover:opacity-100" />
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
          <p>{content.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
