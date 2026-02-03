'use server';

import postgres from 'postgres';
import { Category, Product } from './definitions';
const sql = postgres(process.env.DATABASE_URL!);

export async function fetchCategories() {
  const categories = await sql`
SELECT 
  c.category_id::text,
  c.category_name,
  c.description,
  f.data,
  f.mime_type
FROM categories c
LEFT JOIN files f ON c.image_id::integer = f.id::integer
ORDER BY c.category_id ASC
  `;

  return categories.map((cat): Category => ({
    category_id: cat.category_id,
    category_name: cat.category_name,
    description: cat.description,
    picture: cat.data
      ? `data:${cat.mime_type};base64,${cat.data.toString('base64')}`
      : null
  }));
}

export async function fetchProducts(query: string = ''): Promise<Product[]> {
  try {
    const products = await sql`
      SELECT 
        p.product_id::text,
        p.product_name,
        p.category_id::text,
        c.category_name,
        p.description,
        p.base_price,
        p.sale_price,
        p.created_at,

        COALESCE(
          JSON_AGG(
            DISTINCT 'data:' || f.mime_type || ';base64,' || ENCODE(f.data, 'base64')
          ) FILTER (WHERE f.id IS NOT NULL),
          '[]'::json
        ) as images
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_image_relations pir ON p.product_id = pir.product_id
      LEFT JOIN files f ON pir.image_id = f.id
            WHERE 
        p.product_name ILIKE CONCAT('%', ${query}::text, '%')
        OR p.description ILIKE CONCAT('%', ${query}::text, '%')
      GROUP BY 
        p.product_id, 
        p.product_name, 
        p.description,
        p.base_price,
        p.sale_price,
        p.category_id,
        c.category_name
      ORDER BY p.product_id
    `;

    return products as unknown as Product[];
  } catch (error) {
    console.error(error);
    throw new Error('Не получилось загрузить продукты');
  }
}
