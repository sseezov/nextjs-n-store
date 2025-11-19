import Image from 'next/image'
import { deleteProduct, updateCategory } from "../../../lib/actions";
import styles from './products-table.module.css'

export default function ProductsTable({ products }) {
    console.log(products);
  return <>
    <h3>Товары</h3>
    {products?.map(({ product_id, category_id, product_name, description, base_price, sale_price, created_at, images }) => (
      <div key={product_id} className={styles.container}>
        <div className={styles.formsWrapper}>
          <form className={styles.editForm} action={updateCategory}>
            <input name="product_id" type="hidden" defaultValue={product_id} className={styles.hidden} />

            <div className={styles.imageRow}>
              <label className={styles.label}>Изображения</label>
              <div className={styles.images}>
                {images.map((photo) => (
                  <div key={photo} className={styles.imageContainer}>
                    <Image
                      width='80'
                      height='100'
                      src={`/uploads/${photo}`}
                      alt='product'
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <label htmlFor="product_name" className={styles.label}>Имя продукта</label>
                <input name="product_name" type="text" defaultValue={product_name} className={styles.input} />
              </div>

              <div>
                <label htmlFor="category_id" className={styles.label}>ID категории</label>
                <input name="category_id" type="text" defaultValue={category_id} className={styles.input} />
              </div>

              <div>
                <label htmlFor="description" className={styles.label}>Описание</label>
                <input name="description" type="text" defaultValue={description} className={styles.input} />
              </div>
            </div>

            <div className={styles.row}>
              <div>
                <label htmlFor="base_price" className={styles.label}>Базовая цена</label>
                <input name="base_price" type="text" defaultValue={base_price} className={styles.input} />
              </div>

              <div>
                <label htmlFor="sale_price" className={styles.label}>Цена со скидкой</label>
                <input name="sale_price" type="text" defaultValue={sale_price} className={styles.input} />
              </div>

              <div>
                <label htmlFor="created_at" className={styles.label}>Время создания</label>
                <input name="created_at" type="text" defaultValue={created_at} className={styles.input} />
              </div>

            </div>
              <button className={`${styles.btn} ${styles.editBtn}`} type="submit">
                Редактировать
              </button>
          </form>

          {/* Форма удаления */}
          <form className={styles.deleteForm} action={deleteProduct}>
            <input name="product_id" type="hidden" defaultValue={product_id} className={styles.hidden} />
            <button className={`${styles.btn} ${styles.deleteBtn}`} type="submit">
              Удалить
            </button>
          </form>
        </div>        
      </div>
    ))}
  </>
}