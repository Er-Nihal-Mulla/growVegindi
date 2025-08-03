'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ShoppingCart, UserCircle, LogOut, ChevronDown } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/logo';
import { content as allContent } from '@/lib/content';
import { Badge } from './ui/badge';

export function SiteHeader() {
  const { language, setLanguage, isAuthenticated, user, signOut, cartCount } = useContext(AppContext);
  const content = allContent[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md transition-opacity hover:opacity-80"
              aria-label="Toggle language menu"
            >
              <Logo />
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setLanguage('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLanguage('hi')}>हिंदी</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLanguage('mr')}>मराठी</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
              {content.buttons.browseProducts}
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
               <div className="flex items-center gap-3">
                <Link href="/cart" passHref>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center p-0">
                        {cartCount}
                      </Badge>
                    )}
                    <span className="sr-only">Shopping Cart</span>
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                       <UserCircle className="h-6 w-6" />
                       <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {content.auth.welcome}, {user?.name.split(' ')[0]}!
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{content.auth.signOut}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in" passHref>
                  <Button variant="ghost">{content.auth.signIn}</Button>
                </Link>
                <Link href="/sign-up" passHref>
                  <Button>{content.auth.signUp}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
