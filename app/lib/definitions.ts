export type Category = {
  category_id: string;
  category_name: string;
  description: string;
  picture: string;
};

export type Product = {
  product_id: string,
  category_id: string,
  product_name: string,
  description: string,
  base_price: string,
  sale_price: string,
  created_at: string,
  images: string[]
};

export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  resetCart: () => void;
}
