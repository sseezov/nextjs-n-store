import { createProduct } from "../../../lib/actions"
import { fetchCategories } from "../../../lib/data";
import FileUploadInput from "../../shared/file-upload-input";
import styles from './create-product-form.module.css'

export default async function CreateProductForm() {
  const categories = await fetchCategories();

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Создать товар</h3>
      <form action={createProduct} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Загрузите фотографии</label>
          <FileUploadInput 
            name="photos"
            multiple={true}
            accept="image/*"
            filenames={[]}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_name_create" className={styles.label}>Имя товара</label>
          <input 
            name='product_name_create' 
            required 
            type="text" 
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_category_id" className={styles.label}>Категория</label>
          <select name="product_category_id" className={styles.select}>
            {categories.map(({ category_id, category_name }) => (
              <option key={category_id} value={category_id}>{category_name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_description_create" className={styles.label}>Описание</label>
          <textarea 
            name='product_description_create' 
            required 
            className={styles.textarea}
          />
        </div>

        <div className={styles.priceRow}>
          <div className={styles.formGroup}>
            <label htmlFor="base_price_create" className={styles.label}>Базовая цена</label>
            <input 
              name='base_price_create' 
              required 
              type="number" 
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sale_price_create" className={styles.label}>Цена со скидкой</label>
            <input 
              name='sale_price_create' 
              type="number" 
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Добавить товар
        </button>
      </form>
    </div>
  )
}