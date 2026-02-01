'use server';

import postgres from 'postgres';
import { Category, Product } from './definitions';
const sql = postgres(process.env.DATABASE_URL!);

// export async function fetchCategories() {
//   const categories = await sql`
//     SELECT 
//       c.category_id,
//       c.category_name,
//       c.description,
//       f.id
//     FROM categories c
//     LEFT JOIN files f ON c.category_id = f.id
//     ORDER BY c.category_id ASC
//   `;

//   // Добавляем URL для картинок
//   return categories.map(cat => ({
//     ...cat,
//     picture: cat.image_id ? `/api/images/${cat.image_id}` : null
//   }));
// }

export async function fetchCategories() {
  const categories = await sql`
SELECT 
  c.category_id::text,  -- приводим к text
  c.category_name,
  c.description,
  f.data,
  f.mime_type
FROM categories c
LEFT JOIN files f ON c.image_id::integer = f.id::integer
ORDER BY c.category_id ASC
  `;

  return categories.map(cat => ({
    ...cat,
    picture: cat.data
      ? `data:${cat.mime_type};base64,${cat.data.toString('base64')}`
      : null
  }));
}

export async function fetchProducts(query: string = '') {
  try {
    const data = await sql<Product[]>`SELECT 
    p.product_id::text,
    p.product_name,
    p.category_id::text,
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
OR p.description ILIKE CONCAT('%', ${query}::text, '%')
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
