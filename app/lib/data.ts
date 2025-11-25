'use server';

import postgres from 'postgres';
import { Category, Product } from './definitions';
const sql = postgres(process.env.POSTGRES_ADRESS!);

export async function fetchCategories() {
  try {
    const data = await sql<Category[]>`SELECT * FROM categories ORDER BY category_id ASC`;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось загрузить категории')
  }
}

export async function fetchProducts(query: string = '') {
  try {
    const data = await sql<Product[]>`SELECT 
    p.product_id,
    p.product_name,
    p.category_id,
    c.category_name,
    p.description,
    p.base_price,
    p.sale_price,
    p.created_at,
    JSON_AGG(pi.image_url) as images
FROM products p
LEFT JOIN categories c ON p.category_id = c.category_id
LEFT JOIN product_image_relations pir ON p.product_id = pir.product_id
LEFT JOIN product_images pi ON pir.image_id = pi.id
WHERE p.product_name ILIKE CONCAT('%', ${query}::text, '%')
GROUP BY 
    p.product_id, 
    p.product_name, 
    p.description,
    p.base_price,
    p.sale_price,
    p.category_id,
    c.category_name
ORDER BY p.product_id;`;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Не получилось загрузить продукты')
  }
}
