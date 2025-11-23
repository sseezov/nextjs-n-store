import { createCategory } from "../../../lib/actions"
import styles from './categories.module.css'

export default function CreateCategory() {
  return <>
    <h3>Добавить категорию</h3>
    <div className={`form-group ${styles.formsContainer}`}>
      <form action={createCategory}>
        <div className="input-group">
          <label htmlFor="picture" className={styles.photosLable}>
            <span>Загрузите фотографии</span>
            <input className={styles.input} type="file" multiple name="picture" id="picture" />
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="name" >Имя категории</label>
          <input name='name' required type="text" />
        </div>
        <div className="input-group">
          <label htmlFor="description">Описание</label>
          <input name='description' type="text" />
        </div>

        <button className={`btn btn-primary ${styles.btn}`} type="submit">Добавить категорию</button>
      </form>
    </div>
  </>
}