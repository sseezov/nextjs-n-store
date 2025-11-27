'use client';

import { createProduct } from "../../../lib/actions";
import FileUploadInput from "../../shared/file-upload-input";
import { useState } from 'react';
import styles from './create-product-form.module.css'

interface Category {
  category_id: string;
  category_name: string;
}

interface CreateProductFormProps {
  categories: Category[];
}

export default function CreateProductForm({ categories }: CreateProductFormProps) {
  const [uploadKey, setUploadKey] = useState(0);

  const handleSubmit = async (formData: FormData) => {
    await createProduct(formData);
    // Сбрасываем file input после успешного сабмита
    setUploadKey(prev => prev + 1);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Создать товар</h3>
      <form action={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Загрузите фотографии</label>
          <FileUploadInput 
            key={uploadKey}
            name="photos"
            multiple={true}
            accept="image/*"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_name_create" className={styles.label}>Имя товара</label>
          <input 
            name='product_name_create' 
            required 
            type="text" 
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_category_id" className={styles.label}>Категория</label>
          <select name="product_category_id" className={styles.select}>
            {categories.map(({ category_id, category_name }) => (
              <option key={category_id} value={category_id}>{category_name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="product_description_create" className={styles.label}>Описание</label>
          <textarea 
            name='product_description_create' 
            required 
            className={styles.textarea}
          />
        </div>

        <div className={styles.priceRow}>
          <div className={styles.formGroup}>
            <label htmlFor="base_price_create" className={styles.label}>Базовая цена</label>
            <input 
              name='base_price_create' 
              required 
              type="number" 
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="sale_price_create" className={styles.label}>Цена со скидкой</label>
            <input 
              name='sale_price_create' 
              type="number" 
              className={styles.input}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Добавить товар
        </button>
      </form>
    </div>
  )
}