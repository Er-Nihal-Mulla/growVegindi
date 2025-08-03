
'use client';

import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AppContext } from '@/context/app-context';
import { IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { isAuthenticated, cartTotal, cart, clearCart, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
        <p className="mb-8 text-muted-foreground">You need to be logged in to proceed to checkout.</p>
        <Link href="/sign-in">
          <Button onClick={() => setIsLoading(true)}>Sign In</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
     return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty!</h1>
        <p className="mb-8 text-muted-foreground">Add some products before you can checkout.</p>
        <Link href="/products">
          <Button onClick={() => setIsLoading(true)}>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setLoading(true);
    // Simulate API call for placing order
    setTimeout(() => {
      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. Your fresh produce is on its way!',
      });
      clearCart();
      router.push('/');
      setIsLoading(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-headline font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-8">
          {/* Delivery Address Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="address-1">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="address-1" id="address-1" disabled={loading} />
                    <Label htmlFor="address-1" className="w-full cursor-pointer">
                      <p className="font-semibold">Home</p>
                      <p className="text-muted-foreground">123, B-Wing, Green Valley, Mumbai, 400001</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-4">
                    <RadioGroupItem value="address-2" id="address-2" disabled={loading} />
                    <Label htmlFor="address-2" className="w-full cursor-pointer">
                      <p className="font-semibold">Work</p>
                      <p className="text-muted-foreground">456, Tech Park, Pune, 411057</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
              <Button variant="outline" className="mt-4" disabled={loading}>Add New Address</Button>
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Payment Method</CardTitle>
              <CardDescription>All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="upi">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" disabled={loading}/>
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" disabled={loading} />
                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" disabled={loading} />
                    <Label htmlFor="card">Credit / Debit Card</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {cart.map(item => (
                        <li key={item.product.id} className="flex justify-between">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span className="flex items-center"><IndianRupee className="h-3 w-3" />{(item.product.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="flex items-center"><IndianRupee className="h-5 w-5" />{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardContent>
              <Button className="w-full" onClick={handlePlaceOrder} loading={loading}>Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
