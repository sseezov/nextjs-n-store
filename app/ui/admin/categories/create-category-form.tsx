'use client';

import { useState } from "react";
import { createCategory } from "../../../lib/actions"
import FileUploadInput from "../../shared/file-upload-input";
import styles from './create-category-form.module.css'

export default function CreateCategory() {
  const [uploadKey, setUploadKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    await createCategory(formData);
    // Сбрасываем file input после успешного сабмита
    setUploadKey(prev => prev + 1);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Добавить категорию</h3>
      <form action={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Загрузите фотографию</label>
          <FileUploadInput
            key={uploadKey}
            name="picture"
            multiple={false}
            accept="image/*"
          />
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