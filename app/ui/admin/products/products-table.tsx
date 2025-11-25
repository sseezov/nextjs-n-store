import Image from 'next/image'
import { deleteProduct, updateProduct } from "../../../lib/actions";
import { Category, Product } from '../../../lib/definitions';
import styles from './products-table.module.css'

export default function ProductsTable({ products, categories }: { products: Product[], categories: Category[] }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Товары</h3>
      <div className={styles.productsGrid}>
        {products?.map(({ product_id, category_id: product_category_id, product_name, description, base_price, sale_price, created_at, images }: Product) => (
          <div key={product_id} className={styles.productCard}>
            <form action={updateProduct}>
              <input name="product_id" type="hidden" defaultValue={product_id} />

              <div className={styles.imagesContainer}>
                <label className={styles.imagesLabel}>Изображения</label>
                <div className={styles.imagesGrid}>
                  {images.map((photo) => (
                    <div key={photo} className={styles.imageWrapper}>
                      <Image
                        width='80'
                        height='100'
                        src={`/uploads/products/${photo}`}
                        alt='product'
                        className={styles.image}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="product_name" className={styles.label}>Имя продукта</label>
                  <input name="product_name" type="text" defaultValue={product_name} className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="category_id" className={styles.label}>Категория</label>
                  <select defaultValue={product_category_id} name="category_id" className={styles.select}>
                    {categories.map(({ category_id, category_name }) => (
                      <option key={category_id} value={category_id}>{category_name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>Описание</label>
                  <textarea 
                    name="description" 
                    defaultValue={description} 
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="base_price" className={styles.label}>Базовая цена</label>
                    <input name="base_price" type="text" defaultValue={base_price} className={styles.input} />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="sale_price" className={styles.label}>Цена со скидкой</label>
                    <input name="sale_price" type="text" defaultValue={sale_price} className={styles.input} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="created_at" className={styles.label}>Время создания</label>
                  <input disabled name="created_at" type="text" defaultValue={created_at} className={styles.input} />
                </div>
              </div>

              <div className={styles.buttons}>
                <button type="submit" className={styles.editButton}>
                  Редактировать
                </button>
              </div>
            </form>

            <form action={deleteProduct}>
              <input name="product_id" type="hidden" defaultValue={product_id} />
              <div className={styles.buttons}>
                <button type="submit" className={styles.deleteButton}>
                  Удалить
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}