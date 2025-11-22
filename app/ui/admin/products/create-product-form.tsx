import { createProduct } from "../../../lib/actions"
import { fetchCategories } from "../../../lib/data";
import styles from './products.module.css'

export default async function CreateProductForm() {
  const categories = await fetchCategories();

  return (
    <>
      <h3>Создать товар</h3>
      <form action={createProduct}>
        <label htmlFor="photos" className={styles.photosLable}>
          <span>Загрузите фотографии</span>
          <input className={styles.input} type="file" multiple name="photos" id="photos" />
        </label>
        <label htmlFor="product_name_create">Имя</label>
        <input name='product_name_create' required className="border m-2 border-gray-800" type="text" />
        <label htmlFor="product_category_id">Категория</label>
        <select name="product_category_id">
          {categories.map(({ category_id, category_name }) => (
            <option key={category_id} value={category_id}>{category_name}</option>
          ))}
        </select>
        <label htmlFor="product_description_create">Описание</label>
        <input name='product_description_create' required className="border m-2 border-gray-800" type="text" />
        <label htmlFor="base_price_create">Базовая цена</label>
        <input name='base_price_create' required type="number" className="border m-2 border-gray-800" />
        <label htmlFor="sale_price_create">Цена со скидкой</label>
        <input name='sale_price_create' type="number" className="border m-2 border-gray-800" />
        <button className={`btn btn-primary ${styles.createBtn}`} type="submit">Добавить товар</button>
      </form>
    </>
  )
}