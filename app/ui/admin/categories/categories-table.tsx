import { deleteCategory, updateCategory } from "../../../lib/actions";

export default function CategoriesTable({ categories }) {
  return <>
    <div>Категории товаров:</div>
    {
      categories?.map(({ category_id, category_name, description }: { category_id: string, category_name: string, description: string }) => (
        <div key={category_id} >
          <form className="form-group" action={updateCategory}>
            <input name="category_id" type="hidden" defaultValue={category_id} />
            <label htmlFor="category_name">Имя категории</label>
            <input name="category_name" type="text" defaultValue={category_name} />
            <label htmlFor="description">Описание</label>
            <input name="description" className="border m-2" type="text" defaultValue={description} />
            <button className="btn btn-primary" type="submit">Редактировать</button>
          </form>
          <form action={deleteCategory}>
            <input name="category_id" type="hidden" defaultValue={category_id} />
            <button className="btn btn-primary" type="submit">Удалить</button>
          </form>
        </div>
      ))
    }
  </>
}