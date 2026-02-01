import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL!);

export async function storeImage(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const [result] = await sql`
    INSERT INTO files (filename, mime_type, data, size)
    VALUES (${file.name}, ${file.type}, ${buffer}, ${file.size})
    RETURNING id
  `;
  
  return result.id;
}
