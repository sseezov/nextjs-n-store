import styles from './layout.module.css'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav>
        <h1 className='header'>Админка</h1>
        <div className='nav-menu'>
          <Link className={styles.navLink} href="products">Товары</Link>
          <Link className={styles.navLink} href="categories">Категории</Link>
        </div>
      </nav>
      {children}
    </>
  );
}