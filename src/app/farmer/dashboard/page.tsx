
'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, Package, IndianRupee, BarChart2 } from 'lucide-react';
import { AppContext } from '@/context/app-context';
import { ProtectedRoute } from '@/components/farmer/protected-route';

function FarmerDashboard() {
  const { user, getFarmerProducts, setIsLoading } = useContext(AppContext);
  const farmerProducts = user ? getFarmerProducts(user.name) : [];
  
  const totalEarnings = farmerProducts.reduce((acc, p) => acc + p.price, 0); // Simplified for demo

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-headline font-bold">Farmer Dashboard</h1>
        <Link href="/farmer/add-product" passHref>
          <Button onClick={() => setIsLoading(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerProducts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings (Mock)</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month (mock)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders (Mock)</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5</div>
             <p className="text-xs text-muted-foreground">View orders (coming soon)</p>
          </CardContent>
        </Card>
      </div>

      {/* Product List */}
      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
          <CardDescription>A list of products you are currently selling.</CardDescription>
        </CardHeader>
        <CardContent>
           {farmerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                   <div className="aspect-w-4 aspect-h-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
                    <p className="font-bold text-primary flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{product.price.toFixed(2)}</p>
                    <p className="text-sm">Qty: {product.quantity}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
           ): (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't added any products yet.</p>
              <Link href="/farmer/add-product" passHref>
                <Button variant="link" className="mt-2" onClick={() => setIsLoading(true)}>Add your first product</Button>
              </Link>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}


export default function FarmerDashboardPage() {
    return (
        <ProtectedRoute>
            <FarmerDashboard />
        </ProtectedRoute>
    )
}
