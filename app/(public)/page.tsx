import Swiper from "../ui/public/swiper";
import Search from "../ui/search";
import { fetchCategories } from "../lib/data";
import styles from './page.module.css';

export default async function Home() {
  const categories = await fetchCategories();
  return (
    <div className={styles.homeLayout}>
      <Search placeholder="поиск товаров..." />
      <Swiper categories={categories} />
    </div>
  );
}