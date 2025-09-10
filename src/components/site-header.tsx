
'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { ShoppingCart, UserCircle, LogOut, Globe, Menu, LayoutDashboard, UserPlus, LogIn } from 'lucide-react';
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

export function SiteHeader() {
  const { language, setLanguage, isAuthenticated, user, signOut, cartCount, setIsLoading } = useContext(AppContext);
  const content = allContent[language];
  const languages: { code: 'en' | 'hi' | 'mr', name: string }[] = [
    { code: 'mr', name: 'मराठी' },
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
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

  const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Link href="/sign-in" passHref>
        <Button variant={isMobile ? "outline" : "ghost"} className={cn(isMobile && "w-full justify-start text-lg font-medium")} onClick={handleNavClick}>
          <LogIn className="mr-2 h-5 w-5" />
          {content.auth.signIn}
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={isMobile ? "outline" : "default"} className={cn(isMobile && "w-full justify-start text-lg font-medium")}>
            <UserPlus className="mr-2 h-5 w-5" />
            {content.auth.signUp}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/sign-up?role=farmer" onClick={handleNavClick}>
              {content.buttons.registerFarmer}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/sign-up?role=customer" onClick={handleNavClick}>
              Register as Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center gap-2" aria-label="Grow Vejindi Home" onClick={handleNavClick}>
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-primary/80 text-foreground" onClick={handleNavClick}>
                Home
              </Link>
            </nav>
          <div className="flex items-center justify-end gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
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
                      {`${content.auth.welcome}, ${user?.name.split(' ')[0]}!`}
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
                     {user?.role !== 'farmer' && (
                      <DropdownMenuItem asChild>
                        <Link href="/products" onClick={handleNavClick}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Browse Products</span>
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
              <div className="hidden md:flex items-center gap-2">
                <AuthButtons />
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/10 hover:text-foreground">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Select language</span>
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
                  <nav className="grid gap-6 text-lg font-medium mt-8">
                    <SheetClose asChild>
                      <Link href="/" className="hover:text-primary" onClick={handleNavClick}>Home</Link>
                    </SheetClose>
                    <div className="border-t pt-6 mt-4 space-y-4">
                      {!isAuthenticated && (
                        <div className="flex flex-col gap-4">
                           <AuthButtons isMobile={true} />
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
