'use server';

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_ADRESS!);

export async function fetchProducts() {
  try {
    const data = await sql`SELECT * FROM products ORDER BY product_id ASC`;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: 'Не удалось загрузить товары',
    };
  }
}

export async function fetchCategories() {
  try {
    const data = await sql`SELECT * FROM categories ORDER BY category_id ASC`;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: 'Не удалось загрузить категории',
    };
  }
}
