import { fetchProducts } from "../../../lib/data";
import CreateProductForm from "../../../ui/admin/products/create-product-form";
import ProductsTable from "../../../ui/admin/products/products-table";
export default async function Page(){
  const products = await fetchProducts();

  return <>
    <ProductsTable products={products} />
    <CreateProductForm />
  </>
}