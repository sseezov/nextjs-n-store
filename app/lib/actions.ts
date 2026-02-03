'use server';
import fs from "node:fs/promises";
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { deleteImage, storeImage } from './helpers';
const sql = postgres(process.env.DATABASE_URL!);

// КАТЕГОРИИ

export async function createCategory(formData: FormData) {
  const { name, description, picture } = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    picture: formData.get('picture') as File,
  };

  const imageId = await storeImage(picture);
  try {
    await sql`
      INSERT INTO categories (category_name, description, image_id)
      VALUES (${name}, ${description}, ${imageId})
    `;
  } catch (e) {
    await deleteImage(imageId)
    console.error(e);
    throw new Error("Такая категория уже существует")
  }

  revalidatePath('/admin/categories');
}

export async function updateCategory(formData: FormData) {
  const { id, name, description } = {
    id: formData.get('category_id') as string,
    name: formData.get('category_name') as string,
    description: formData.get('description') as string,
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
  const { id } = { id: formData.get('category_id') as string };
  const [result] = await sql`DELETE FROM categories WHERE category_id = ${id} returning image_id`;
  const { image_id } = result;
  await deleteImage(image_id);
  revalidatePath('/admin/categories');
}

// ПРОДУКТЫ

export async function createProduct(formData: FormData) {
  const { product_name, category_id, description, base_price, sale_price, photos } = {
    product_name: formData.get('product_name_create') as string,
    category_id: formData.get('product_category_id') as string,
    description: formData.get('product_description_create') as string,
    base_price: formData.get('base_price_create') as string,
    sale_price: formData.get('sale_price_create') as string,
    photos: formData.getAll('photos') as [File],
  };

  const fileIDs = await Promise.all(photos.map((file) => (storeImage(file))))

  try {
    const productResult = await sql`INSERT INTO products (category_id, product_name, base_price, sale_price, description)
      VALUES (${category_id}, ${product_name}, ${base_price}, ${sale_price}, ${description})
    RETURNING product_id `;
    const { product_id } = productResult[0];
    const imagePromises = fileIDs.map(async (filename) => {
      const imageResult = await sql`
      INSERT INTO product_images (image_id, is_main)
      VALUES (${filename}, ${false})
      RETURNING image_id`;

      const { image_id } = imageResult[0];
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
  const { id } = { id: formData.get('product_id') as string };
  try {
    const photos = await sql`SELECT * FROM product_image_relations WHERE product_id = ${id};`;
    photos.forEach(async ({ image_id }) => {
      await deleteImage(image_id)
    });
    await sql`DELETE FROM products WHERE product_id = ${id};`
  } catch (e) {
    console.error(e);
    throw new Error('Ошибка при удалении элемента')
  }
  revalidatePath('/admin');
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