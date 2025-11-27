'use client';

import { Category } from '../../../lib/definitions';
import styles from './catalog.module.css';

interface CategoriesSidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoriesSidebar({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoriesSidebarProps) {

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Категории</h3>
      <ol className={styles.categoriesList}>
        <li className={styles.categoryItem}>
          <button
            onClick={() => onCategoryChange('all')}
            className={`${styles.categoryButton} ${
              activeCategory === 'all' ? styles.active : ''
            }`}
          >
            Все товары
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.category_id} className={styles.categoryItem}>
            <button
              onClick={() => onCategoryChange(category.category_id)}
              className={`${styles.categoryButton} ${
                activeCategory === category.category_id ? styles.active : ''
              }`}
            >
              {category.category_name}
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}