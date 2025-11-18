import Image from 'next/image'
import { deleteProduct, updateCategory } from "../../../lib/actions";
import styles from './products-table.module.css'

export default function ProductsTable({ products }) {
  return <>
    <h3>Товары</h3>
    {products?.map(({ product_id, category_id, product_name, description, base_price, sale_price, created_at, images }) => (
      <div key={product_id} >
        <form className={styles.formGroup} action={updateCategory}>
          <div className={styles.formValues}>
            <div className={styles.formCell}>
              {images.map((photo) => <Image key={photo.split('_')[0]} width='100' height='300' src={`/uploads/${photo}`} alt='p' />)}
            </div>
            <div className={styles.formCell}>
              <input name="product_id" type="hidden" defaultValue={product_id} />
              <label htmlFor="product_name">Имя продукта</label>
              <input name="product_name" type="text" defaultValue={product_name} />
              <label htmlFor="category_id">Имя категории</label>
              <input name="category_id" className="border m-2" type="text" defaultValue={category_id} />
              <label htmlFor="description">Описание</label>
              <input name="description" className="border m-2" type="text" defaultValue={description} />
            </div>
            <div className={styles.formCell}>
              <label htmlFor="base_price">Базовая цена</label>
              <input name="base_price" className="border m-2" type="text" defaultValue={base_price} />
              <label htmlFor="sale_price">Цена со скидкой</label>
              <input name="sale_price" className="border m-2" type="text" defaultValue={sale_price} />
              <label htmlFor="created_at">Время создания</label>
              <input name="created_at" className="border m-2" type="text" defaultValue={created_at} />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">Редактировать</button>
        </form>
        <form action={deleteProduct}>
          <input name="product_id" type="hidden" defaultValue={product_id} />
          <button className={`btn btn-primary ${styles.deleteBtn}`} type="submit">Удалить</button>
        </form>
      </div>
    ))}
  </>
}