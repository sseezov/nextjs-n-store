import Image from 'next/image'
import { deleteProduct, updateCategory } from "../../../lib/actions";
import styles from './products-table.module.css'

export default function ProductsTable({ products }) {
  return <>
    <h3>Товары</h3>
    {products?.map(({ product_id, category_id, product_name, description, base_price, sale_price, created_at, images }) => (
      <div key={product_id} className={styles.container}>
        <div className={styles.formsWrapper}>
          {/* Форма редактирования */}
          <form className={styles.editForm} action={updateCategory}>
            <input name="product_id" type="hidden" defaultValue={product_id} className={styles.hidden} />

            {/* Первая колонка - Основная информация */}
            <div className={styles.column}>
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

            {/* Вторая колонка - Изображения */}
            <div className={styles.column}>
              <label className={styles.label}>Изображения</label>
              <div className={styles.images}>
                {images.map((photo) => (
                  <div key={photo.split('_')[0]} className={styles.imageContainer}>
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

            {/* Третья колонка - Цены */}
            <div className={styles.column}>
              <div>
                <label htmlFor="base_price" className={styles.label}>Базовая цена</label>
                <input name="base_price" type="text" defaultValue={base_price} className={styles.input} />
              </div>

              <div>
                <label htmlFor="sale_price" className={styles.label}>Цена со скидкой</label>
                <input name="sale_price" type="text" defaultValue={sale_price} className={styles.input} />
              </div>

              <button className={`${styles.btn} ${styles.editBtn}`} type="submit">
                Редактировать
              </button>
            </div>
          </form>

          {/* Форма удаления */}
          <form className={styles.deleteForm} action={deleteProduct}>
            <input name="product_id" type="hidden" defaultValue={product_id} className={styles.hidden} />
            <button className={`${styles.btn} ${styles.deleteBtn}`} type="submit">
              Удалить
            </button>
          </form>
        </div>

        {/* Время создания */}
        <p className={styles.createdAt}>{`Время создания: ${created_at}`}</p>
      </div>
    ))}
  </>
}