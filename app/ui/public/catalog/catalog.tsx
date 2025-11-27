'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '../../../lib/definitions';
import CategoriesSidebar from './categories-sidebar';
import ProductsGrid from './products-grid';
import styles from './catalog.module.css';

interface CatalogProps {
  products: Product[];
  categories: Category[];
}

export default function Catalog({ products, categories }: CatalogProps) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // При изменении параметра URL обновляем активную категорию
  useEffect(() => {
    if (urlCategory) {
      console.log(1,urlCategory);
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  console.log(7, products, activeCategory);

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