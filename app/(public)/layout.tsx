'use client'

import Header from '../ui/public/layout/header';
import '../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="main">
        {children}
      </main>
    </>
  )
}