import { fetchProducts, fetchCategories } from "../../lib/data";
import Catalog from "../../ui/public/catalog/catalog";
import styles from "./styles.module.css";

export default async function Page(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.search || '';
  const [products, categories] = await Promise.all([
    fetchProducts(query),
    fetchCategories()
  ]);

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Каталог товаров</h1>
      </header>
      <Catalog products={products} categories={categories} />
    </div>
  );
}