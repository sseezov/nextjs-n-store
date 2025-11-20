'use server';
import fs from "node:fs/promises";
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_ADRESS!);

export async function createCategory(formData: FormData) {
  const { name, description } = {
    name: formData.get('name') as 'string',
    description: formData.get('description') as 'string',
  };
  try {
    await sql`INSERT INTO categories (category_name, description)
      VALUES (${name}, ${description})
    `;
    revalidatePath('/admin');
  } catch (error) {
    console.error('SQL Error:', error)
    throw new Error('Такая категория уже существует')
  }
}

export async function updateCategory(formData: FormData) {
  const { id, name, description } = {
    id: formData.get('category_id') as 'string',
    name: formData.get('category_name') as 'string',
    description: formData.get('description') as 'string',
  };

  try {
    await sql`
    UPDATE categories
    SET category_name = ${name}, description = ${description}
    WHERE category_id = ${id}
  `;
  } catch (e) {
    console.error(e);
    throw new Error('Такая категория уже существует')
  }
  revalidatePath('/admin');
}

export async function deleteCategory(formData: FormData) {
  const { id } = { id: formData.get('category_id') as 'string' };
  await sql`DELETE FROM categories WHERE category_id = ${id}`;
  revalidatePath('/admin');
}

export async function createProduct(formData: FormData) {
  const { product_name, category_id, description, base_price, sale_price, photos } = {
    product_name: formData.get('product_name_create') as 'string',
    category_id: formData.get('product_category_id') as 'string',
    description: formData.get('product_description_create') as 'string',
    base_price: formData.get('base_price_create') as 'string',
    sale_price: formData.get('sale_price_create') as 'string',
    photos: formData.getAll('photos') as [File],
  };

  const filenames = await Promise.all(photos.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniquePrefix}-${file.name}`;
    await fs.writeFile(`./public/uploads/${filename}`, buffer);
    return filename;
  }))

  try {
    const productResult = await sql`INSERT INTO products (category_id, product_name, base_price, sale_price, description)
      VALUES (${category_id}, ${product_name}, ${base_price}, ${sale_price}, ${description})
    RETURNING product_id `;
    const { product_id } = productResult[0];
    const imagePromises = filenames.map(async (filename) => {
      const imageResult = await sql`
      INSERT INTO product_images (image_url, is_main)
      VALUES (${filename}, ${false})
      RETURNING id`;

      const { id: image_id } = imageResult[0];

      await sql`
      INSERT INTO product_image_relations (product_id, image_id)
      VALUES (${product_id}, ${image_id}) `;
    });

    await Promise.all(imagePromises);
    revalidatePath('/admin/products');
  } catch (error) {
    console.error('SQL Error:', error)
    throw new Error('Такой продукт уже существует')
  }
}

export async function deleteProduct(formData: FormData) {
  const { id } = { id: formData.get('product_id') as 'string' };
  try {
    const photos = await sql`SELECT * FROM product_image_relations WHERE product_id = ${id};`;
    photos.forEach(async ({ image_id }) => {
      const [result] = await sql`DELETE FROM product_images WHERE id = ${image_id} RETURNING image_url;`;
      const { image_url } = result;
      await fs.unlink(`./public/uploads/${image_url}`);
    })
    await sql`DELETE FROM products WHERE product_id = ${id};`
  } catch (e) {
    console.error(e);
    throw new Error('Ошибка при удалении элемента')
  }
  revalidatePath('/admin/products');
}

export async function updateProduct(formData: FormData) {
  const { product_id, category_id, product_name, description, base_price, sale_price } = {
    product_id: formData.get('product_id') as 'string',
    category_id: formData.get('category_id') as 'string',
    product_name: formData.get('product_name') as 'string',
    description: formData.get('description') as 'string',
    base_price: formData.get('base_price') as 'string',
    sale_price: formData.get('sale_price') as 'string',
  };

  try {
    await sql`UPDATE products
    SET product_name = ${product_name}, description = ${description}, category_id = ${category_id},
    base_price = ${base_price}, sale_price = ${sale_price}
    WHERE product_id = ${product_id}`;
  } catch (e) {
    console.error(e);
    throw new Error('Database Error: Failed to Update product.')
  }

  revalidatePath('/admin/products');
}