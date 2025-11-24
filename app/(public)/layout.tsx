import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="header">
        <nav className="nav container">
          <div className="logo">
            <Link href="/">
              <h1>Швейно-вышивальная мастерская</h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link href="/catalog">Каталог</Link>
            <Link href="/about">О нас</Link>
            <Link href="/admin">Админка</Link>
          </div>
        </nav>
      </header>
      <main className="main">
        {children}
      </main>
    </>
  )
}