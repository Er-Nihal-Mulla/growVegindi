
'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Leaf, Handshake, IndianRupee, Award, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';
import mobileAppImg from '../assets/mobileApp.png';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


export default function HomePage() {
  const { language, setIsLoading } = useContext(AppContext);
  const content = allContent[language];
  
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const benefits = [
    { icon: Leaf, text: content.whyChooseUs.points[0] },
    { icon: Handshake, text: content.whyChooseUs.points[1] },
    { icon: IndianRupee, text: content.whyChooseUs.points[2] },
    { icon: Award, text: content.whyChooseUs.points[3] },
  ];

  const visionImages = [
    { src: 'https://placehold.co/600x400.png', alt: 'Illustration of a bridge connecting farms to a city', hint: 'farm city' },
    { src: 'https://placehold.co/600x400.png', alt: 'A happy family receiving a box of fresh vegetables', hint: 'happy family' },
    { src: 'https://placehold.co/600x400.png', alt: 'A farmer using a tablet to manage their crops', hint: 'farmer technology' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src={mobileAppImg}
            alt="A smiling Indian farmer holding fresh produce in a field"
            data-ai-hint="smiling farmer produce"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              {content.hero.subtitle}
            </p>
             <div className='mt-2 text-base md:text-lg max-w-3xl mx-auto drop-shadow-md'>
                {allContent['hi'].hero.subtitle}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="py-16 md:py-24 bg-background">
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

        {/* CTA Section */}
        <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{content.cta.title}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">{content.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/products" passHref><Button size="lg" variant="secondary" onClick={() => setIsLoading(true)}>{content.buttons.shopNow}</Button></Link>
                <Link href="/sign-up?role=farmer" passHref><Button size="lg" variant="secondary" onClick={() => setIsLoading(true)}>{content.buttons.registerFarmer}</Button></Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-secondary border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{content.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
