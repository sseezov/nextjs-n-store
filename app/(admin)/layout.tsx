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
        <div>
          <Link className={styles.navLink} href="/"><h1>Админка</h1></Link>
        </div>
        <div className='nav-menu'>
          <Link className={styles.navLink} href="/catalog">Товары</Link>
          <Link className={styles.navLink} href="/about">Категории</Link>
        </div>
      </nav>
      {children}
    </>
  );
}