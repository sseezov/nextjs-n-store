import { deleteCategory, updateCategory } from "../../../lib/actions";

export default function CategoriesTable({ categories }) {
  return (
    <>
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
    </>
  )
}