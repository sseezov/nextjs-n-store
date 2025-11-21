'use client'
import { useState } from "react";
import { Category, Product } from "../../../lib/definitios";
import ProductsTable from "./products-table";
import styles from './products.module.css'

export default function ProductsList({ products, categories }: { products: Product[], categories: Category[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const selectProductsByCategory = (category: string) => {
    const productsByCategory = products.filter((product) => product.category_id === category)
    setFilteredProducts(productsByCategory)
  }

  return <>
    <li className={styles.categoryTabs}>
      {categories.map(({ category_id, category_name }) => {
        return <ol key={category_id}>
          <button className={styles.btn} onClick={() => selectProductsByCategory(category_id)}>{category_name}</button>
        </ol>
      })}
    </li>
    <ProductsTable products={filteredProducts} categories={categories} />
  </>
}