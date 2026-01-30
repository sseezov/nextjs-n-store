'use client';

import { createContext, useContext } from 'react';
import { Product, CartContextType, CartItem } from '../lib/definitions';
import { useLocalCart } from '../lib/hooks';

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  resetCart: () => { }
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalCart()

  const addToCart = (product: Product) => {
    const newProduct = cart.find((cartItem: CartItem) => cartItem.product_id === product.product_id);

    const newCart = newProduct ? cart.map((cartProduct: CartItem) => (
      cartProduct.product_id === product.product_id
        ? { ...product, quantity: cartProduct.quantity + 1 }
        : cartProduct
    )) : [...cart, { ...product, quantity: 1 }]
    setCart(newCart)
    localStorage.setItem('n-store-cart', JSON.stringify(newCart))
  };

  const removeFromCart = (cartItem: CartItem) => {
    const { product_id } = cartItem;
    const newCart = cart.filter((item) => item.product_id !== product_id);
    setCart(newCart)
    localStorage.setItem('n-store-cart', JSON.stringify(newCart))
  }

  const updateQuantity = (cartItem: CartItem, newQuantity: number) => {
    const { product_id } = cartItem;
    const newCart = cart.map((item) => {
      if (item.product_id === product_id) {
        return { ...item, quantity: newQuantity }
      } return item
    });
    setCart(newCart)
    localStorage.setItem('n-store-cart', JSON.stringify(newCart))
  }

  const resetCart = () => {
    setCart([]);
    localStorage.setItem('n-store-cart', '[]')
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      resetCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);