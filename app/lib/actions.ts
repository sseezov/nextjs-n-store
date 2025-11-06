'use server';
import { redirect } from 'next/navigation';
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

    // Бросаем ошибку с понятным сообщением
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
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/admin');
}

export async function deleteCategory(formData: FormData) {
  const { id } = { id: formData.get('category_id') as 'string' };
  await sql`DELETE FROM categories WHERE category_id = ${id}`;
  revalidatePath('/admin');
}