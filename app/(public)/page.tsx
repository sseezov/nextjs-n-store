import Swiper from "./../ui/public/swiper";
import Search from "../ui/search";
import { fetchCategories } from "../lib/data";

export default async function Home() {
  const categories = await fetchCategories();
  return (
    <>
      <Search placeholder="поиск товаров..." />
      <Swiper categories={categories} />
    </>
  );
}
