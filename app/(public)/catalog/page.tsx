import { fetchProducts, fetchCategories } from "../../lib/data";
import Catalog from "./../../ui/public/categories/catalog";
import styles from "./styles.module.css";

export default async function Page() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories() // Нужно добавить эту функцию в lib/data
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