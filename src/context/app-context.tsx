
'use client';

import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { Language, User, Product, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AppContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  isAuthenticated: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  language: 'en',
  setLanguage: () => {},
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  isLoading: false,
  setIsLoading: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const handleSetCart = useCallback((newCart: CartItem[]) => {
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
  }, []);

  const signIn = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    handleSetCart([]); // Clear cart on sign out
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
        const newCart = prevCart.filter((item) => item.product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
    });
  };
  
  const clearCart = () => {
    handleSetCart([]);
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => {
        const newCart = prevCart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return newCart;
    });
  };
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isAuthenticated,
        user,
        signIn,
        signOut,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
