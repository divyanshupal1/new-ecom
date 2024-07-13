import { categoriesData } from "../../../Data/staticData";
import CategoryCard from "../../Shared/ProductsCards/CategoryCard";
import s from "./CategoriesSlider.module.scss";
import { useCategoryStore } from "../../../store/useCategoryStore";
import { useEffect } from "react";

const CategoriesSlider = () => {
  const {categories,fetchCategories} = useCategoryStore((state)=>({
    categories:state.categories,
    fetchCategories:state.fetchCategories
  }))
  useEffect(() => {
    if(categories==undefined) fetchCategories();
  }, []);
  return (
    <div className={s.categoriesSlider}>
      {Object.keys(categories||{})?.map((id) => (
        <CategoryCard categoryData={categories[id]} key={id} />
      ))}
    </div>
  );
};
export default CategoriesSlider;
