export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  stockQuantity: number;
  category: Category;
}

export type Category = {
  id: number;
  name: string;
  categoryPath: string;
}

export type User = {
  username: string;
  password: string;
}