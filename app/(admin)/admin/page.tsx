import { fetchCategories, fetchProducts } from "../../lib/data"
import { createCategory, deleteCategory, updateCategory } from "../../lib/actions";
import CreateProductForm from "../../ui/admin/create-product-form";
import Image from 'next/image'

export default async function Home() {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return <>
    <div className="text-xl font-bold text-blue-300 underline">Категории товаров:</div>
    <div className="flex justify-center">
      <div className="relative overflow-x-auto">
        {categories?.map(({ category_id, category_name, description }: { category_id: string, category_name: string, description: string }) => (
          <div className="flex justify-center" key={category_id} >
            <form action={updateCategory}>
              <input name="category_id" type="hidden" defaultValue={category_id} />
              <label htmlFor="category_name">Имя категории</label>
              <input name="category_name" className="border m-2" type="text" defaultValue={category_name} />
              <label htmlFor="description">Описание</label>
              <input name="description" className="border m-2" type="text" defaultValue={description} />
              <button className="border m-2" type="submit">Редактировать</button>
            </form>
            <form action={deleteCategory}>
              <input name="category_id" type="hidden" defaultValue={category_id} />
              <button className="border m-2" type="submit">Удалить</button>
            </form>
          </div>
        ))}
        <div className="text-lg font-bold text-blue-300 underline">Добавить категорию</div>
        <form className="flex justify-center" action={createCategory}>
          <label htmlFor="name" >Имя категории</label>
          <input name='name' required className="border m-2 border-gray-800" type="text" />
          <label htmlFor="description">Описание</label>
          <input name='description' className="border m-2 border-gray-800" type="text" />
          <button className="border border-gray-800 m-2" type="submit">Добавить категорию</button>
        </form>
      </div>
    </div>
    <div className="text-xl font-bold text-blue-300 underline">Товары</div>
    {products?.map(({ product_id, category_id, product_name, description, base_price, sale_price, created_at, images }) => (
      <div className="flex justify-center" key={product_id} >
        <form action={updateCategory}>
          {images.map((photo) => <Image width='100' height='300' src={`/uploads/${photo}`}/>)}
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
    <div className="text-lg font-bold text-blue-300 underline">Добавить товар</div>
    <CreateProductForm />
  </>
}