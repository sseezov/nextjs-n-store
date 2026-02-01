import Image from "next/image";
import { deleteCategory, updateCategory } from "../../../lib/actions";
import { Category } from "../../../lib/definitions";
import styles from './categories-table.module.css';

export default function CategoriesTable({ categories }: { categories: Category[] }) {
  return (
    <div className={styles.categoriesGrid}>
      {categories?.map(({ category_id, category_name, description, picture }: Category) => (
        <div key={category_id} className={styles.categoryCard}>
          <form action={updateCategory}>
            <input name="category_id" type="hidden" defaultValue={category_id} />
            <Image
              width='80'
              height='100'
              src={`${picture}`}
              alt='product'
              className={styles.image}
            />
            <div className={styles.formGroup}>
              <label htmlFor="category_name" className={styles.label}>Имя категории</label>
              <input
                name="category_name"
                type="text"
                defaultValue={category_name}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Описание</label>
              <textarea
                name="description"
                defaultValue={description}
                className={styles.textarea}
              />
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.editButton}>Редактировать</button>
            </div>
          </form>
          <form action={deleteCategory}>
            <input name="category_id" type="hidden" defaultValue={category_id} />
            <div className={styles.buttons}>
              <button type="submit" className={styles.deleteButton}>Удалить</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}