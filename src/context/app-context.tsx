
'use client';

import { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { Language, User, Product, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { SignUpFormValues } from '@/app/sign-up/page';
import { useRouter } from 'next/navigation';

const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', description: 'Juicy and ripe tomatoes from local farms.', price: 50, image: 'https://placehold.co/400x300.png', seller: 'Ram\'s Farm', quantity: 100, category: 'Vegetable' },
  { id: '2', name: 'Organic Spinach', description: 'Healthy and fresh organic spinach.', price: 40, image: 'https://placehold.co/400x300.png', seller: 'Sita\'s Garden', quantity: 120, category: 'Vegetable' },
  { id: '3', name: 'Crisp Potatoes', description: 'Perfect for all your favorite dishes.', price: 30, image: 'https://placehold.co/400x300.png', seller: 'Laxman\'s Fields', quantity: 200, category: 'Vegetable' },
  { id: '4', name: 'Sweet Onions', description: 'Large, sweet onions for great flavor.', price: 35, image: 'https://placehold.co/400x300.png', seller: 'Ram\'s Farm', quantity: 150, category: 'Vegetable' },
  { id: '5', name: 'Green Chilies', description: 'Spicy green chilies to heat things up.', price: 20, image: 'https://placehold.co/400x300.png', seller: 'Bharat\'s Produce', quantity: 80, category: 'Vegetable' },
  { id: '6', name: 'Fresh Ginger', description: 'Aromatic ginger for teas and cooking.', price: 60, image: 'https://placehold.co/400x300.png', seller: 'Sita\'s Garden', quantity: 90, category: 'Vegetable' },
];

type AppContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  isAuthenticated: boolean;
  user: User | null;
  isGuest: boolean;
  signIn: (user: User) => void;
  signInAsGuest: () => void;
  signOut: () => void;
  signUpAndSignIn: (userData: SignUpFormValues & { role: 'farmer' | 'customer' }, paymentDetails: User['paymentDetails']) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'seller'>) => void;
  getFarmerProducts: (farmerName: string) => Product[];
};

export const AppContext = createContext<AppContextType>({
  language: 'en',
  setLanguage: () => {},
  isAuthenticated: false,
  user: null,
  isGuest: false,
  signIn: () => {},
  signInAsGuest: () => {},
  signOut: () => {},
  signUpAndSignIn: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  isLoading: true,
  setIsLoading: () => {},
  products: [],
  addProduct: () => {},
  getFarmerProducts: () => [],
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) setLanguage(storedLang);

    const storedUser = localStorage.getItem('user');
    const guestStatus = localStorage.getItem('isGuest') === 'true';

    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsGuest(false);
    } else if (guestStatus) {
        setIsAuthenticated(true); // Treat guest as "authenticated" for UI purposes
        setIsGuest(true);
        setUser({ id: 'guest', name: 'Guest', email: '', role: 'customer' });
    }


    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(mockProducts);
    }
    
    setIsLoading(false);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  const handleSetCart = useCallback((newCart: CartItem[]) => {
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
  }, []);

  const handleSetProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  }, []);

  const signIn = (userData: User) => {
    setIsAuthenticated(true);
    setIsGuest(false);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('isGuest');
  };

  const signInAsGuest = () => {
    setIsLoading(true);
    setIsAuthenticated(true);
    setIsGuest(true);
    setUser({ id: 'guest', name: 'Guest', email: '', role: 'customer' }); // Dummy user object for guest
    localStorage.setItem('isGuest', 'true');
    localStorage.removeItem('user');
    router.push('/');
    setTimeout(() => setIsLoading(false), 300);
  };
  
  const signUpAndSignIn = (userData: SignUpFormValues & { role: 'farmer' | 'customer' }, paymentDetails: User['paymentDetails']) => {
     const newUser: User = {
      id: String(Date.now()),
      name: userData.name,
      mobile: userData.mobile,
      village: userData.village,
      taluka: userData.taluka,
      district: userData.district,
      email: '', // Email is not collected
      role: userData.role,
      paymentDetails,
    };
    signIn(newUser);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setIsGuest(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    handleSetCart([]);
    router.push('/');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      let newCart;
      if (existingItem) {
        newCart = prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...prevCart, { product, quantity }];
      }
      handleSetCart(newCart);
      toast({ title: "Added to cart!", description: `${product.name} has been added to your cart.` });
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    handleSetCart(newCart);
  };
  
  const clearCart = () => {
    handleSetCart([]);
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
    );
    handleSetCart(newCart);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'seller'>) => {
    if (!user || isGuest) {
        toast({
            title: "Action Not Allowed",
            description: "Guests cannot add products.",
            variant: "destructive"
        })
        return;
    };
    const newProduct: Product = {
      ...productData,
      id: String(Date.now()),
      seller: user.name,
    };
    handleSetProducts([...products, newProduct]);
  };

  const getFarmerProducts = (farmerName: string) => {
    return products.filter(p => p.seller === farmerName);
  }
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        isAuthenticated,
        user,
        isGuest,
        signIn,
        signInAsGuest,
        signOut,
        signUpAndSignIn,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isLoading,
        setIsLoading,
        products,
        addProduct,
        getFarmerProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
