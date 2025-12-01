'use client';

import { useState, useEffect } from 'react';
import { Cart, CartItem } from './definitions';

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemsCount: 0
  });

  // Загружаем корзину при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem('n-store-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Сохраняем корзину при изменении
  useEffect(() => {
    localStorage.setItem('n-store-cart', JSON.stringify(cart));
  }, [cart]);

  // Добавление товара
  const addToCart = (product: Omit<CartItem, 'quantity' | 'addedAt'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(
        item => item.product_id === product.product_id
      );

      let newItems: CartItem[];
      
      if (existingItem) {
        // Увеличиваем количество если товар уже в корзине
        newItems = prevCart.items.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Добавляем новый товар
        const newItem: CartItem = {
          ...product,
          quantity: 1,
          addedAt: new Date().toISOString()
        };
        newItems = [...prevCart.items, newItem];
      }

      // Пересчитываем итоги
      const total = newItems.reduce((sum, item) => {
        const price = item.sale_price && item.sale_price < item.base_price 
          ? item.sale_price 
          : item.base_price;
        return sum + (price * item.quantity);
      }, 0);

      const itemsCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemsCount
      };
    });
  };

  // Удаление товара
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product_id !== productId);
      
      const total = newItems.reduce((sum, item) => {
        const price = item.sale_price && item.sale_price < item.base_price 
          ? item.sale_price 
          : item.base_price;
        return sum + (price * item.quantity);
      }, 0);

      const itemsCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemsCount
      };
    });
  };

  // Изменение количества
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product_id === productId
          ? { ...item, quantity }
          : item
      );

      const total = newItems.reduce((sum, item) => {
        const price = item.sale_price && item.sale_price < item.base_price 
          ? item.sale_price 
          : item.base_price;
        return sum + (price * item.quantity);
      }, 0);

      const itemsCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemsCount
      };
    });
  };

  // Очистка корзины
  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemsCount: 0
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}