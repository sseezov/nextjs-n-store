'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import { Product, Category } from '../../../lib/definitions';

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === activeCategory);

  const getDisplayPrice = (product: Product) => {
    const salePrice = parseFloat(product.sale_price);
    const basePrice = parseFloat(product.base_price);
    
    if (salePrice && salePrice < basePrice) {
      return (
        <div className={styles.productPrice}>
          <span className={styles.basePrice}>{basePrice} ₽</span>
          <span className={styles.salePrice}>{salePrice} ₽</span>
        </div>
      );
    }
    
    return (
      <div className={styles.productPrice}>
        <span className={styles.finalPrice}>{basePrice} ₽</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Боковая панель с категориями */}
      <aside className={styles.categories}>
        <h3 className={styles.categoriesTitle}>Категории</h3>
        <ol className={styles.categoriesList}>
          <li className={styles.categoryItem}>
            <button
              className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              Все товары
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.category_id} className={styles.categoryItem}>
              <button
                className={`${styles.categoryButton} ${activeCategory === category.category_id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.category_id)}
              >
                {category.category_name}
              </button>
            </li>
          ))}
        </ol>
      </aside>

      {/* Основная область с товарами */}
      <main className={styles.products}>
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.product_id} className={styles.productCard}>
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.product_name}
                  className={styles.productImage}
                />
              )}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.product_name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                {getDisplayPrice(product)}
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className={styles.noProducts}>
              <h3 className={styles.noProductsTitle}>Товары не найдены</h3>
              <p className={styles.noProductsText}>
                {activeCategory === 'all' 
                  ? 'В каталоге пока нет товаров' 
                  : 'В этой категории пока нет товаров'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}