import { fetchCategories } from "../../../lib/data";
import CategoriesTable from "../../../ui/admin/categories/categories-table";
import CreateCategory from "../../../ui/admin/categories/create-form";

export default async function Page() {
  const categories = await fetchCategories();

  return <>
    <h3>Категории товаров: </h3>
    <CategoriesTable categories={categories} />
    <CreateCategory />
  </>
}