import { createCategory } from "../../../lib/actions";

export default function createCategoryForm() {
  return <>
    <div className="text-lg font-bold text-blue-300 underline">Добавить категорию</div>
    <form className="flex justify-center" action={createCategory}>
      <label htmlFor="name" >Имя категории</label>
      <input name='name' required className="border m-2 border-gray-800" type="text" />
      <label htmlFor="description">Описание</label>
      <input name='description' className="border m-2 border-gray-800" type="text" />
      <button className="border border-gray-800 m-2" type="submit">Добавить категорию</button>
    </form>
  </>
}