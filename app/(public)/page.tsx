import Swiper from "./../ui/public/swiper";
import Search from "../ui/search";

export default function Home() {
  return (
    <>
      <Search placeholder="поиск товаров..." />
      <h1>Слайдер</h1>
      <Swiper/>
    </>
  );
}
