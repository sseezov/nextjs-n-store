import Image from 'next/image'
import { createCategory, deleteCategory, updateCategory } from "../../../lib/actions";

export default function ProductsTable({ products }) {
  return <>
    <div className="text-xl font-bold text-blue-300 underline">Товары</div>
    {products?.map(({ product_id, category_id, product_name, description, base_price, sale_price, created_at, images }) => (
      <div className="flex justify-center" key={product_id} >
        <form action={updateCategory}>
          {images.map((photo) => <Image width='100' height='300' src={`/uploads/${photo}`} />)}
          <input name="product_id" type="hidden" defaultValue={product_id} />
          <label htmlFor="category_name">Имя продукта</label>
          <input name="category_id" type="hidden" defaultValue={category_id} />
          <label htmlFor="category_name">Имя категории</label>
          <input name="product_name" className="border m-2" type="text" defaultValue={product_name} />
          <label htmlFor="description">Описание</label>
          <input name="description" className="border m-2" type="text" defaultValue={description} />
          <label htmlFor="base_price">Базовая цена</label>
          <input name="base_price" className="border m-2" type="text" defaultValue={base_price} />
          <label htmlFor="sale_price">Цена со скидкой</label>
          <input name="sale_price" className="border m-2" type="text" defaultValue={sale_price} />
          <p>{`Время создания:${created_at}`}</p>
          <button className="border m-2" type="submit">Редактировать</button>
        </form>
        <form action={deleteCategory}>
          <input name="category_id" type="hidden" defaultValue={category_id} />
          <button className="border m-2" type="submit">Удалить</button>
        </form>
      </div>
    ))}
  </>
}