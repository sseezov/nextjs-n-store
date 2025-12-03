'use client';

import Link from 'next/link';
import styles from './header.module.css';
import { useCart } from '../../../context/cart-context';

export default function Header() {
  const { cart } = useCart();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>Швейно-вышивальная мастерская</h1>
          </Link>
        </div>

        <div className={styles.navLinks}>
          <Link href="/catalog" className={styles.navLink}>Каталог</Link>
          <Link href="/about" className={styles.navLink}>О нас</Link>
          <Link href="/admin" className={styles.navLink}>Админка</Link>

          {/* Иконка корзины */}
          <Link href="/cart" className={styles.cartLink}>
            <div className={styles.cartIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className={styles.cartBadge}>
                {cart.length}
              </span>
            </div>
            <span className={styles.cartText}>Корзина</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}