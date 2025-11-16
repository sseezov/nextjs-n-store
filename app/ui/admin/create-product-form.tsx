import { createProduct } from "../../lib/actions"
import { fetchCategories } from "../../lib/data";
import { useEffect, useState } from "react";

export default function CreateProductForm() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function loadData() {
      const categories = await fetchCategories();
      setCategories(categories)
      // setProducts(products)
    }
    loadData()
  }, [])

  return (
    <form className="flex justify-center" action={createProduct}>
      <label>
        <span>Загрузите фотографии</span>
        <input type="file" multiple name="file" />
      </label>
      <label htmlFor="product_name_create" >Имя</label>
      <input name='product_name_create' required className="border m-2 border-gray-800" type="text" />
      <label htmlFor="product_category_id" >Категория</label>
      <select name="product_category_id">
        {categories.map(({ category_id, category_name }) => {
          return <option key={category_id} value={category_id}>{category_name}</option>
        })}
      </select>
      <label htmlFor="product_description_create">Описание</label>
      <input name='product_description_create' required className="border m-2 border-gray-800" type="text" />
      <label htmlFor="base_price_create">Базовая цена</label>
      <input name='base_price_create' required className="border m-2 border-gray-800" type="text" />
      <label htmlFor="sale_price_create">Цена со скидкой</label>
      <input name='sale_price_create' className="border m-2 border-gray-800" type="text" />
      <button className="border border-gray-800 m-2" type="submit">Добавить товар</button>
    </form>
  )
}