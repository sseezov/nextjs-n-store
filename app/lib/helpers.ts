import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL!);

export async function storeImage(file: File) {
  if (!file || file.size === 0) {
    throw new Error('Файл не загружен');
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const [result] = await sql`
    INSERT INTO files (filename, mime_type, data, size)
    VALUES (${file.name}, ${file.type}, ${buffer}, ${file.size})
    RETURNING id
  `;

  return result.id;
}

export async function deleteImage(fileId: number | string) {
  const [result] = await sql`
    DELETE FROM files 
    WHERE id = ${fileId}
    RETURNING id
  `;
  
  return result; // { id: number, filename: string } или undefined если не найден
}
