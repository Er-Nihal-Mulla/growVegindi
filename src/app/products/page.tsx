
'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppContext } from '@/context/app-context';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { IndianRupee, ShoppingCart } from 'lucide-react';

const mockProducts: Product[] = [
  { id: '1', name: 'Fresh Tomatoes', description: 'Juicy and ripe tomatoes from local farms.', price: 50, image: 'https://placehold.co/400x300.png', seller: 'Ram\'s Farm' },
  { id: '2', name: 'Organic Spinach', description: 'Healthy and fresh organic spinach.', price: 40, image: 'https://placehold.co/400x300.png', seller: 'Sita\'s Garden' },
  { id: '3', name: 'Crisp Potatoes', description: 'Perfect for all your favorite dishes.', price: 30, image: 'https://placehold.co/400x300.png', seller: 'Laxman\'s Fields' },
  { id: '4', name: 'Sweet Onions', description: 'Large, sweet onions for great flavor.', price: 35, image: 'https://placehold.co/400x300.png', seller: 'Ram\'s Farm' },
  { id: '5', name: 'Green Chilies', description: 'Spicy green chilies to heat things up.', price: 20, image: 'https://placehold.co/400x300.png', seller: 'Bharat\'s Produce' },
  { id: '6', name: 'Fresh Ginger', description: 'Aromatic ginger for teas and cooking.', price: 60, image: 'https://placehold.co/400x300.png', seller: 'Sita\'s Garden' },
];

export default function ProductsPage() {
  const { isAuthenticated, addToCart, setIsLoading } = useContext(AppContext);
  
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p className="mb-8 text-muted-foreground">You need to be logged in to view our products.</p>
        <Link href="/sign-in">
          <Button onClick={() => setIsLoading(true)}>Sign In</Button>
        </Link>
      </div>
    );
  }

  const getProductHint = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('tomatoes')) return 'fresh tomatoes';
    if (name.includes('spinach')) return 'spinach';
    if (name.includes('potatoes')) return 'potatoes';
    if (name.includes('onions')) return 'onions';
    if (name.includes('chilies')) return 'chili';
    if (name.includes('ginger')) return 'ginger';
    return 'vegetable';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-headline font-bold mb-8">Our Fresh Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="p-0">
              <div className="aspect-w-4 aspect-h-3">
                 <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover"
                    data-ai-hint={getProductHint(product.name)}
                  />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-lg font-headline mb-2">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-secondary/50">
              <p className="text-lg font-bold text-primary flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                {product.price.toFixed(2)}
              </p>
              <Button onClick={() => addToCart(product)} loading={!isAuthenticated}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
