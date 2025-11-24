'use client';

import { createCategory } from "../../../lib/actions"
import { useRef, useState } from 'react'
import styles from './create-category-form.module.css'

export default function CreateCategory() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Добавить категорию</h3>
      <form action={createCategory} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Загрузите фотографию</label>
          <div className={styles.fileInputWrapper}>
            <input 
              type="file" 
              name="picture" 
              id="picture" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={styles.fileInputLabel}
            >
              Выберите файл
            </button>
            {fileName && <span className={styles.fileName}>{fileName}</span>}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Имя категории</label>
          <input 
            name='name' 
            required 
            type="text" 
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Описание</label>
          <textarea 
            name='description' 
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Добавить категорию
        </button>
      </form>
    </div>
  )
}