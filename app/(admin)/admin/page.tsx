import { fetchCategories } from "../../lib/data"
import { createCategory, deleteCategory, updateCategory } from "../../lib/actions";

export default async function Home() {
  const categories = await fetchCategories();
  console.log(categories);

  return <>
    <h1 className="text-2xl font-bold text-purple-800 bg-purple-100 p-2 rounded-md">Админ панель</h1>
    <div className="text-4xl font-bold text-blue-300 underline">Категории товаров:</div>
    <div className="flex justify-center">
      <div className="relative overflow-x-auto">
        {categories?.map(({ category_id, category_name, description }) => (
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
        <div className="text-4xl font-bold text-blue-300 underline">Добавить категорию</div>
        <form className="flex justify-center" action={createCategory}>
          <label htmlFor="name" >Имя категории</label>
          <input name='name' required className="border m-2 border-gray-800" type="text" />
          <label htmlFor="description">Описание</label>
          <input name='description' className="border m-2 border-gray-800" type="text" />
          <button className="border border-gray-800 m-2" type="submit">Добавить категорию</button>
        </form>
      </div>
    </div>

  </>
}