
'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ShoppingCart, UserCircle, LogOut, Globe, Menu, LayoutDashboard } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Separator } from './ui/separator';

export function SiteHeader() {
  const { language, setLanguage, isAuthenticated, user, signOut, cartCount, setIsLoading } = useContext(AppContext);
  const content = allContent[language];
  const languages: { code: 'en' | 'hi' | 'mr', name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ];

  const handleSignOut = () => {
    setIsLoading(true);
    setTimeout(() => {
        signOut();
        setIsLoading(false);
    }, 500);
  }

  const handleNavClick = () => {
    setIsLoading(true);
  }
  
  const handleMobileNavClick = (close: () => void) => {
    handleNavClick();
    close();
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: content.buttons.browseProducts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-6 mr-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Grow Vejindi Home" onClick={handleNavClick}>
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end gap-1">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <nav className="flex items-center gap-1">
                  {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary/80 text-foreground px-3 py-2" onClick={handleNavClick}>
                        {link.label}
                      </Link>
                    ))}
                </nav>
                <Link href="/cart" passHref onClick={handleNavClick}>
                  <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-accent/10 hover:text-foreground">
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
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/10 hover:text-foreground">
                      <UserCircle className="h-6 w-6" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {content.auth.welcome}, {user?.name.split(' ')[0]}!
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user?.role === 'farmer' && (
                      <DropdownMenuItem asChild>
                        <Link href="/farmer/dashboard" onClick={handleNavClick}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Farmer Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{content.auth.signOut}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <nav className="flex items-center gap-1">
                  {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary/80 text-foreground px-3 py-2" onClick={handleNavClick}>
                        {link.label}
                      </Link>
                    ))}
                </nav>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/10 hover:text-foreground">
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

                <Separator orientation="vertical" className="h-6 mx-2 bg-foreground/50" />
                <Link href="/sign-in" passHref>
                  <Button variant="ghost" className="text-foreground hover:bg-accent/10 hover:text-foreground" onClick={handleNavClick}>{content.auth.signIn}</Button>
                </Link>
                <Link href="/sign-up" passHref>
                  <Button variant="secondary" onClick={handleNavClick}>{content.auth.signUp}</Button>
                </Link>
              </div>
            )}
          </div>

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
                    <SheetClose asChild>
                      <nav className="grid gap-6 text-lg font-medium mt-8">
                          {navLinks.map((link) => (
                          <Link key={link.href} href={link.href} className="hover:text-primary" onClick={handleNavClick}>{link.label}</Link>
                          ))}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="justify-start px-0 text-lg font-medium">
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
                              {user?.role === 'farmer' && (
                                <Link href="/farmer/dashboard" className="flex items-center hover:text-primary" onClick={handleNavClick}>
                                  <LayoutDashboard className="mr-2 h-5 w-5" />
                                  Farmer Dashboard
                                </Link>
                              )}
                                <Link href="/cart" className="flex items-center hover:text-primary" onClick={handleNavClick}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Shopping Cart ({cartCount})
                              </Link>
                              <Button onClick={handleSignOut} className="w-full justify-start text-lg font-medium" variant="ghost">
                                  <LogOut className="mr-2 h-4 w-4" />
                                  <span>{content.auth.signOut}</span>
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Link href="/sign-in" passHref><SheetClose asChild><Button className="w-full" onClick={handleNavClick}>Sign In</Button></SheetClose></Link>
                              <Link href="/sign-up" passHref><SheetClose asChild><Button variant="outline" className="w-full" onClick={handleNavClick}>Sign Up</Button></SheetClose></Link>
                            </div>
                          )}
                        </div>
                      </nav>
                    </SheetClose>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
