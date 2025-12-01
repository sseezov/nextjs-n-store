'use client';

import { Product } from '../../../lib/definitions';
import ProductCard from './product-card';
import styles from './catalog.module.css';

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <main className={styles.main}>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <h3>Товары не найдены</h3>
            <p>
              {products.length === 0
                ? 'В каталоге пока нет товаров'
                : 'В этой категории пока нет товаров'
              }
            </p>
          </div>
        )}
      </div>
    </main>
  );
}