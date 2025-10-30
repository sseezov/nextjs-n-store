'use server';

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_ADRESS!);

export async function fetchGoods() {
  try {
    const data = await sql`SELECT * FROM products`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
  }
}