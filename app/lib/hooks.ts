'use client';

import { useState } from 'react';
import { CartItem } from './definitions';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getCart = () => localStorage.getItem('n-store-cart')
    ? JSON.parse(localStorage.getItem('n-store-cart')!)
    : cart;


  const addToCart = (product: Omit<CartItem, 'quantity' | 'addedAt'>) => {
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

  const removeFromCart = (productId: string) => {
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([]);
    localStorage.setItem('n-store-cart', JSON.stringify(cart))
  };

  return {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
  };
}