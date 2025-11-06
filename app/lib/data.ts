'use server';

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_ADRESS!);

export async function fetchGoods() {
  try {
    const data = await sql`SELECT * FROM products ORDER BY id ASC`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCategories() {
  try {
    const data = await sql`SELECT * FROM categories ORDER BY category_id ASC`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}