
'use client';

import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AppContext } from '@/context/app-context';
import { content as allContent } from '@/lib/content';
import { Trash2, IndianRupee } from 'lucide-react';

export default function CartPage() {
  const { language, isAuthenticated, cart, updateQuantity, removeFromCart, cartTotal, setIsLoading } = useContext(AppContext);
  const content = allContent[language].cart;

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p className="mb-8 text-muted-foreground">You need to be logged in to view your cart.</p>
        <Link href="/sign-in">
          <Button onClick={() => setIsLoading(true)}>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">{content.empty}</h1>
        <p className="mb-8 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/products">
          <Button onClick={() => setIsLoading(true)}>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-headline font-bold mb-8">{content.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] sm:w-1/3">{content.product}</TableHead>
                      <TableHead>{content.price}</TableHead>
                      <TableHead>{content.quantity}</TableHead>
                      <TableHead>{content.total}</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map(({ product, quantity }) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-4">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                              data-ai-hint={product.name.split(' ')[1]?.toLowerCase() || 'vegetable'}
                            />
                            <span className="line-clamp-2">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell><div className='flex items-center'><IndianRupee className="h-4 w-4" />{product.price.toFixed(2)}</div></TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value, 10))}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell><div className='flex items-center'><IndianRupee className="h-4 w-4" />{(product.price * quantity).toFixed(2)}</div></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className='flex items-center'><IndianRupee className="h-4 w-4" />{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>{content.total}</span>
                    <span className='flex items-center'><IndianRupee className="h-5 w-5" />{cartTotal.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Link href="/checkout" className="w-full">
                <Button className="w-full" onClick={() => setIsLoading(true)}>{content.checkout}</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
