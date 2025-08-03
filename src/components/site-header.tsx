'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ShoppingCart, UserCircle, LogOut, Globe, Menu } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function SiteHeader() {
  const { language, setLanguage, isAuthenticated, user, signOut, cartCount } = useContext(AppContext);
  const content = allContent[language];
  const languages: { code: 'en' | 'hi' | 'mr', name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Grow Vejindi Home">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
              {content.buttons.browseProducts}
            </Link>
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Change language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onSelect={() => setLanguage(lang.code)}
                    className={cn(language === lang.code ? 'font-semibold bg-secondary' : 'font-normal')}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="grid gap-6 text-lg font-medium mt-8">
                    <Link href="/" className="hover:text-primary">Home</Link>
                    <Link href="/products" className="hover:text-primary">{content.buttons.browseProducts}</Link>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="justify-start px-0">
                                <Globe className="mr-2 h-5 w-5" />
                                Change Language
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {languages.map((lang) => (
                            <DropdownMenuItem
                                key={lang.code}
                                onSelect={() => setLanguage(lang.code)}
                                className={cn(language === lang.code ? 'font-semibold bg-secondary' : 'font-normal')}
                            >
                                {lang.name}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="border-t pt-6 mt-auto">
                     {isAuthenticated ? (
                       <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <UserCircle className="h-6 w-6" />
                            <span>{user?.name.split(' ')[0]}</span>
                          </div>
                           <Link href="/cart" className="flex items-center hover:text-primary">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Shopping Cart ({cartCount})
                          </Link>
                          <Button onClick={signOut} className="w-full justify-start" variant="ghost">
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>{content.auth.signOut}</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/sign-in" passHref><Button className="w-full">Sign In</Button></Link>
                          <Link href="/sign-up" passHref><Button variant="outline" className="w-full">Sign Up</Button></Link>
                        </div>
                      )}
                    </div>
                  </nav>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
