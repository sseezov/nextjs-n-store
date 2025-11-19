'use server';

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_ADRESS!);

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

export async function fetchProducts() {
  try {
    const data = await sql`SELECT 
    p.product_id,
    p.category_id,
    p.product_name,
    p.description,
    p.base_price,
    p.sale_price,
    JSON_AGG(pi.image_url) as images
    FROM products p
    LEFT JOIN product_image_relations pir ON p.product_id = pir.product_id
    LEFT JOIN product_images pi ON pir.image_id = pi.id
    GROUP BY p.product_id, p.product_name, p.description
    ORDER BY p.product_id;`;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: 'Не удалось загрузить товары',
    };
  }
}