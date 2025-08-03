
'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AppContext } from '@/context/app-context';
import { ProtectedRoute } from '@/components/farmer/protected-route';
import { useToast } from '@/hooks/use-toast';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
  quantity: z.coerce.number().int().min(0, 'Quantity must be a whole number'),
  category: z.string().min(2, 'Category is required'),
  image: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
});

type ProductFormValues = z.infer<typeof productSchema>;

function AddProductForm() {
  const { addProduct, setIsLoading } = useContext(AppContext);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    setLoading(true);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        const finalData = {
            ...data,
            image: data.image || `https://placehold.co/400x300.png`
        };
        addProduct(finalData);
        toast({
            title: "Product Added!",
            description: `${data.name} has been successfully listed.`
        });
        router.push('/farmer/dashboard');
    }, 1500);

  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Add New Product</CardTitle>
          <CardDescription>Fill out the details below to list a new product for sale.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" {...register('name')} disabled={loading} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} disabled={loading} />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <Label htmlFor="price">Price (per unit)</Label>
                <Input id="price" type="number" step="0.01" {...register('price')} disabled={loading} />
                {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
                </div>

                <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Available</Label>
                <Input id="quantity" type="number" {...register('quantity')} disabled={loading} />
                {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message}</p>}
                </div>
            </div>

             <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="e.g., Vegetable, Fruit, Grain" {...register('category')} disabled={loading} />
              {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

             <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="https://..." {...register('image')} disabled={loading} />
              <p className="text-xs text-muted-foreground">Leave blank to use a default placeholder image.</p>
              {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
            </div>
            
            <div className="flex justify-end pt-4">
                <Button type="submit" loading={loading}>Add Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default function AddProductPage() {
    return (
        <ProtectedRoute>
            <AddProductForm />
        </ProtectedRoute>
    )
}
