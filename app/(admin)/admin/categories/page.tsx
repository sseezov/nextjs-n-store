import { fetchCategories } from "../../../lib/data";
import CategoriesTable from "../../../ui/admin/categories/categories-table";
import CreateCategory from "../../../ui/admin/categories/create-category-form";
import styles from './categories.module.css'

export default async function Page() {
  const categories = await fetchCategories();

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>Категории товаров</h3>
      <CategoriesTable categories={categories} />
      <CreateCategory />
    </div>
  );
}