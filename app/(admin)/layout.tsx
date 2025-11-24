import Link from 'next/link'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="header">
        <nav className="nav container">
          <div className="logo">
            <Link href="/admin">
              <h1>Панель администратора</h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link href="/admin/products">Товары</Link>
            <Link href="/admin/categories">Категории</Link>
            <Link href="/">На главную</Link>
          </div>
        </nav>
      </header>

      <main className="main">
        {children}
      </main>
    </>
  );
}