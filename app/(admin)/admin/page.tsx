'use client'

import { fetchCategories, fetchProducts } from "../../lib/data"
import CreateProductForm from "../../ui/admin/products/create-form";
import CreateCategoryForm from "../../ui/admin/categories/create-form";
import ProductsTable from "../../ui/admin/products/table";
import CategoriesTable from "../../ui/admin/categories/table";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadData() {
      const categories = await fetchCategories();
      const products = await fetchProducts();
      setCategories(categories)
      setProducts(products)
    }
    loadData()
  }, [])

  return <>
    <div>Категории товаров:</div>
    <CategoriesTable categories={categories} />
    <CreateCategoryForm />
    <ProductsTable products={products} />
    <CreateProductForm />
  </>
}