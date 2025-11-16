import { fetchCategories, fetchProducts } from "../../lib/data"
import CreateProductForm from "../../ui/admin/products/create-product-form";
import CreateCategory from "../../ui/admin/categories/create-form";
import ProductsTable from "../../ui/admin/products/products-table";
import CategoriesTable from "../../ui/admin/categories/categories-table";

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return <>
    <CategoriesTable categories={categories} />
    <CreateCategory />
    <ProductsTable products={products} />
    <CreateProductForm />
  </>
}