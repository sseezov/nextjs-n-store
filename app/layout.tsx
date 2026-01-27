'use client'
import { Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/cart-context';
import { useEffect, useState } from 'react';

const cormorant = Cormorant_Garamond({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const lora = Lora({
  subsets: ['cyrillic'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [localCart, setLocalCart] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('n-store-cart')) {
      localStorage.setItem('n-store-cart', '[]')
    } else setLocalCart(JSON.parse(localStorage.getItem('n-store-cart')))
  }, [])

  return (
    <html lang="ru" className={`${cormorant.variable} ${lora.variable}`}>
      <body>
        <CartProvider useCart={[localCart, setLocalCart]}>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
