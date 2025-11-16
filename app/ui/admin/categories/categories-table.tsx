import { deleteCategory, updateCategory } from "../../../lib/actions";
import styles from './categories-table.module.css'

export default function CategoriesTable({ categories }) {
  
  return <>
    {
      categories?.map(({ category_id, category_name, description }: { category_id: string, category_name: string, description: string }) => (
        <div className={`form-group ${styles.formsContainer}`} key={category_id} >
          <form action={updateCategory}>
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