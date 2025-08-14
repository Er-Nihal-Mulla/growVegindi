
'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Handshake, IndianRupee, Award, Rocket, LineChart, Target, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import heroImage from '../assets/mobileApp.png'
import visionSlide1 from '../assets/visionSlide1.png'
import NotifyForm from '@/components/NotifyForm';


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
  
  const features = [
    { icon: Target, title: content.features[0].title, description: content.features[0].description },
    { icon: DollarSign, title: content.features[1].title, description: content.features[1].description },
    { icon: LineChart, title: content.features[2].title, description: content.features[2].description }
  ]

  const visionImages = [
    { src: heroImage, alt: 'Illustration of a bridge connecting farms to a city', hint: 'farm city' },
    { src: visionSlide1, alt: 'A happy family receiving a box of fresh vegetables', hint: 'happy family' },
    { src: heroImage, alt: 'A farmer using a tablet to manage their crops', hint: 'farmer technology' },
  ];
  
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/grow_vejindi?igsh=bjI0OGptZjVoeHV5&utm_source=qr' },
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
        
        <NotifyForm />

        {/* CTA Section */}
        <section id="cta" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <Rocket className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{content.cta.title}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">{content.cta.subtitle}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:opacity-80 transition-opacity">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <defs>
                    <linearGradient
                      id="instagram-gradient"
                      x1="28.16"
                      x2="3.84"
                      y1="3.84"
                      y2="28.16"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fdc16d" offset="0" />
                      <stop stopColor="#f77737" offset=".15" />
                      <stop stopColor="#d6249f" offset=".4" />
                      <stop stopColor="#8a3ab9" offset=".7" />
                      <stop stopColor="#4c68d7" offset=".95" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#instagram-gradient)"
                    d="M26,3H6C4.346,3,3,4.346,3,6V26c0,1.654,1.346,3,3,3H26c1.654,0,3-1.346,3-3V6C29,4.346,27.654,3,26,3ZM20,16a4,4,0,1,1-4-4A4,4,0,0,1,20,16Z"
                  />
                  <path
                    fill="#fff"
                    d="M16,10c-3.309,0-6,2.691-6,6s2.691,6,6,6,6-2.691,6-6S19.309,10,16,10Zm0,10c-2.206,0-4-1.794-4-4s1.794-4,4-4,4,1.794,4,4S18.206,20,16,20Z"
                  />
                  <circle fill="#fff" cx="22.5" cy="9.5" r="1.5" />
                </svg>
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
