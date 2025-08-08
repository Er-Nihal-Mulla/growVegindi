import React from 'react';
import { Leaf } from 'lucide-react';
import growVejindiImg from '../assets/growVejindiImg.jpeg';
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center gap-1" aria-label="Grow Vejindi Logo">
      <div className="p-2 rounded-lg">
      <Image className="h-6 w-6 rounded-lg" alt="" src={growVejindiImg}/>
      </div>
      <span className="font-headline text-xl font-bold text-foreground">Grow Vejindi</span>
    </div>
  );
}
