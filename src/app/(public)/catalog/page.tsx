import { fetchGoods } from "@/app/lib/data"

export default async function Page(){
  const goods = await fetchGoods();
  console.log(goods);

  return <h1>catalog</h1>
}