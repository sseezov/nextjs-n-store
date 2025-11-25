'use client';

import { useState } from 'react';
import { Product, Category } from '../../../lib/definitions';
import CategoriesSidebar from './categories-sidebar';
import ProductsGrid from './products-grid';
import styles from './catalog.module.css';

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category_id === activeCategory);

  return (
    <div className={styles.container}>
      <CategoriesSidebar 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductsGrid products={filteredProducts} />
    </div>
  );
}