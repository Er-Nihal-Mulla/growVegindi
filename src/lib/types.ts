export type Language = 'en' | 'hi' | 'mr';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'farmer';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  quantity: number;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
