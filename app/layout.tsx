import { Cormorant_Garamond, Lora } from 'next/font/google';
import './globals.css';

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
  return (
    <html lang="ru" className={`${cormorant.variable} ${lora.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
