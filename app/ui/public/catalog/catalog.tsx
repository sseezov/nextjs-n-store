'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, Category } from '../../../lib/definitions';
import CategoriesSidebar from './categories-sidebar';
import ProductsGrid from './products-grid';
import styles from './catalog.module.css';

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string>(urlCategory || 'all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.category_id === activeCategory);

  const handleCategoryChange = ((category: string) => {
    setActiveCategory(category)
    router.push(`/catalog?category=${category}`)
  })

  return (
    <div className={styles.container}>
      <CategoriesSidebar 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ProductsGrid products={filteredProducts} />
    </div>
  );
}