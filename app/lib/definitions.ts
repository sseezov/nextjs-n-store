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

export interface CartItem {
  product_id: string;
  product_name: string;
  base_price: string;
  sale_price?: string;
  quantity: number;
  images: string[];
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartItem: CartItem) => void;
  updateQuantity: (cartItem: CartItem, newQuantity: number) => void;
  resetCart: () => void;
}
