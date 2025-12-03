'use client';

import { createContext, useContext, useState } from 'react';
import { Product, CartContextType } from '../lib/definitions';

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  resetCart: () => { }
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>(JSON.parse(localStorage.getItem('n-store-cart')!)|| []);
  const addToCart = (product: Product) => {
    if (!localStorage.getItem('n-store-cart')) {
      setCart([product])
      localStorage.setItem('n-store-cart', JSON.stringify(cart))
    }
    const savedCart = JSON.parse(localStorage.getItem('n-store-cart')!);
    savedCart.push(product)
    setCart(savedCart)
    localStorage.setItem('n-store-cart', JSON.stringify(savedCart))
    console.log('cart: ', cart);
  };

  const resetCart = () => {
    setCart([]);
    localStorage.setItem('n-store-cart', '[]')
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      resetCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);