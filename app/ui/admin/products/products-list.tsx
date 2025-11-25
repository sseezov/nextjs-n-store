'use client'
import { useEffect, useState } from "react";
import { Category, Product } from "../../../lib/definitions";
import ProductsTable from "./products-table";
import styles from './products-list.module.css'

export default function ProductsList({ products, categories }: { products: Product[], categories: Category[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const selectProductsByCategory = (categoryId: string) => {
    const productsByCategory = categoryId ? 
      products.filter((product) => product.category_id === categoryId)
      : products;
    setFilteredProducts(productsByCategory);
    setSelectedCategory(categoryId);
  }

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  
  return (
    <div className={styles.container}>
      <ul className={styles.tabsList}>
        {categories.map(({ category_id, category_name }) => {
          return <li key={category_id} className={styles.tabItem}>
            <button 
              onClick={() => selectProductsByCategory(category_id)}
              className={`${styles.tabButton} ${
                selectedCategory === category_id ? styles.tabButtonActive : ''
              }`}
            >
              {category_name}
            </button>
          </li>
        })}
      </ul>
      <ProductsTable products={filteredProducts} categories={categories} />
    </div>
  )
}