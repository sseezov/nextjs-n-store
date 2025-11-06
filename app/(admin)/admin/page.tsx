import { fetchCategories } from "../../lib/data"
import { createCategory, deleteCategory, updateCategory } from "../../lib/actions";

export default async function Home() {
  const categories = await fetchCategories();
  console.log(categories);

  return <>
    <h1>Админ панель</h1>
    <div>Категории товаров:</div>
    <div className="flex justify-center">
      <div className="relative overflow-x-auto">
        {categories?.map(({ category_id, category_name, description }) => (
          <div key={category_id} >
            <form action={updateCategory}>
              <input name="category_id" type="hidden" defaultValue={category_id} />
              <input name="category_name" className="border" type="text" defaultValue={category_name} />
              <input name="description" className="border" type="text" defaultValue={description} />
              <button type="submit">Редактировать</button>
            </form>
            <form action={deleteCategory}>
              <input name="category_id" type="hidden" defaultValue={category_id} />
              <button type="submit">Удалить</button>
            </form>
          </div>
        ))}
      </div>
    </div>

    <form action={createCategory}>
      <label htmlFor="name" >Имя категории</label>
      <input name='name' required className="border border-gray-800" type="text" />
      <label htmlFor="description">Описание категории</label>
      <input name='description' className="border border-gray-800" type="text" />
      <button className="border border-gray-800" type="submit">Добавить категорию</button>
    </form>
  </>
}