'use client'

import Header from '../ui/public/layout/header';
import '../globals.css';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(()=>{
    if (!localStorage.getItem('n-store-cart')){
      localStorage.setItem('n-store-cart', '[]')
    }
  }, [])

  return (
    <>
      <Header />
      <main className="main">
        {children}
      </main>
    </>
  )
}