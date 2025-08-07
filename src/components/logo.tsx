import React from 'react';
import { Leaf } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="Grow Vejindi Logo">
      <div className="p-1.5 bg-primary rounded-lg">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-headline text-xl font-bold text-foreground">Grow Vejindi</span>
    </div>
  );
}
