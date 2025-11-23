import fs from "node:fs/promises";

export const storeImage = async (file: File, folder: 'products' | 'categories') => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `${uniquePrefix}-${file.name}`;
  await fs.writeFile(`./public/uploads/${folder}/${filename}`, buffer);
  return filename;
}
