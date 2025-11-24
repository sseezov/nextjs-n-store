'use client'
import { useEffect, useState } from "react";
import { Category, Product } from "../../../lib/definitions";
import ProductsTable from "./products-table";
import styles from './products.module.css'

export default function ProductsList({ products, categories }: { products: Product[], categories: Category[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const selectProductsByCategory = (category: string) => {
    const productsByCategory = category ? 
    products.filter((product) => product.category_id === category)
    : products;
    setFilteredProducts(productsByCategory);
  }
  useEffect(() => {
    console.log(1);
    setFilteredProducts(products)
  }, [products])
  
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