import { fetchCategories, fetchProducts } from "../../../lib/data";
import CreateProductForm from "../../../ui/admin/products/create-product-form";
import ProductsList from "../../../ui/admin/products/products-list";

export default async function Page() {
  const products = await fetchProducts();
  const categories = await fetchCategories();

  return <>
    <ProductsList products={products} categories={categories} />
    <CreateProductForm />
  </>
}