
'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Handshake, IndianRupee, Award, Rocket, LineChart, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import heroImage from '../assets/mobileApp.png'
import ourVisionImg from '../assets/ourVisionImg.png'
import visionSlide1 from '../assets/visionSlide1.png'
import clickImg from '../assets/clickImg.jpeg'
import clickImage from '../assets/clickImage.png'
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
    { icon: IndianRupee, title: content.features[1].title, description: content.features[1].description },
    { icon: LineChart, title: content.features[2].title, description: content.features[2].description }
  ]

  const visionImages = [
    { src: visionSlide1, alt: 'A happy family receiving a box of fresh vegetables', hint: 'happy family' },
    { src: clickImage, alt: 'Illustration of a bridge connecting farms to a city', hint: 'farm city' },
    { src: ourVisionImg, alt: 'A farmer using a tablet to manage their crops', hint: 'farmer technology' },
    { src: clickImg, alt: 'A farmer using a tablet to manage their crops', hint: 'farmer clicking' },
  ];
  
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/grow_vejindi?igsh=bjI0OGptZjVoeHV5&utm_source=qr' },
    { name: 'WhatsApp', url: 'https://wa.me/9270357711' },
    { name: 'Gmail', url: 'mailto:growvejindi@gmail.com' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src={heroImage}
            alt="A smiling Indian farmer holding fresh Product in a field"
            data-ai-hint="smiling farmer Product"
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
                {link.name === 'Instagram' && (
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
                       <stop stop-color="#feda75" offset="0" />
                       <stop stop-color="#fa7e1e" offset=".25" />
                       <stop stop-color="#d62976" offset=".5" />
                       <stop stop-color="#962fbf" offset=".75" />
                       <stop stop-color="#4f5bd5" offset="1" />
                     </linearGradient>
                   </defs>
                   <circle cx="16" cy="16" r="14" fill="url(#instagram-gradient)" />
                   <path
                     fill="#fff"
                     d="M20.5 9h-9C9.57 9 8 10.57 8 12.5v7c0 1.93 1.57 3.5 3.5 3.5h9c1.93 0 3.5-1.57 3.5-3.5v-7c0-1.93-1.57-3.5-3.5-3.5zm-4.5 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4.75-7.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                   />
                   <circle fill="#fff" cx="16" cy="16" r="2" />
                 </svg>
                 
                )}
                {link.name === 'WhatsApp' && (
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <defs>
                      <linearGradient
                        id="whatsapp-gradient"
                        x1="28.16"
                        x2="3.84"
                        y1="3.84"
                        y2="28.16"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#5BD066" offset="0" />
                        <stop stop-color="#27B43E" offset="1" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#whatsapp-gradient)"
                      d="M16 2C8.268 2 2 8.268 2 16c0 2.61.662 5.064 1.818 7.095L2 30l6.91-1.818A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
                    />
                    <path
                      fill="#fff"
                      d="M12.5 9.5c-.333-.67-.844-.61-1.36-.61-.922 0-2.36 1.104-2.36 3.16 0 1.685.742 3.528 3.243 6.287 2.414 2.662 5.585 4.039 8.218 3.992 2.633-.046 3.175-2.312 3.175-3.077 0-.339-.21-.508-.355-.554-.897-.431-2.552-1.233-2.929-1.384-.376-.151-.573.053-.695.164-.341.326-1.018 1.285-1.25 1.501-.232.216-.578.107-.721.025-.529-.212-1.964-.85-3.108-1.959-1.414-1.371-1.497-1.843-1.763-2.263-.213-.336-.057-.542.021-.632.305-.351.725-.894.914-1.164.189-.27.039-.68-.051-.935-.386-1.097-.714-2.015-.98-2.55z"
                    />
                  </svg>
                )}
                 {link.name === 'Gmail' && (
                  <svg 
                    className="w-6 h-6"
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor">
                    <path d="M22 5.889v12.222c0 1.054-.856 1.912-1.912 1.912H3.912C2.856 20.023 2 19.165 2 18.111V5.889c0-.24.045-.471.127-.686l.004-.01 9.422 7.066a.75.75 0 0 0 .9 0l9.42-7.065.006.012A1.904 1.904 0 0 1 22 5.89ZM3.024 4.002l9.043 6.782L21.01 3.95a1.912 1.912 0 0 0-1.583-.95H4.57a1.912 1.912 0 0 0-1.546.952Z" />
                  </svg>
                )}
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

