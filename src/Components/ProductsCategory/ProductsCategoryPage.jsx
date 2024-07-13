import { Helmet } from "react-helmet-async";
import { categoryProductsCustomizations } from "../../Data/staticData";
import { capitalize } from "../../Functions/helper";
import useGetSearchParam from "../../Hooks/Helper/useGetSearchParam";
import CategoriesSection from "../Home/CategoriesSection/CategoriesSection";
import PagesHistory from "../Shared/MiniComponents/PagesHistory";
import ProductsCategory from "./ProductsCategory";
import s from "./ProductsCategoryPage.module.scss";
import { useCategoryStore } from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";
import { useEffect } from "react";

const ProductsCategoryPage = () => {

  const categoryId = useGetSearchParam("type");

  const {categories} = useCategoryStore((state)=>({
    categories:state.categories,
  }))


  return (
    <>
      <Helmet>
        <title>{ capitalize(categories?.[categoryId]?.name)}</title>
      </Helmet>

      <div className="container">
        <main className={s.categoryPage}>
          <PagesHistory history={["/", capitalize(categories?.[categoryId]?.name)]} />

          <section className={s.categoryContent}>
            <ProductsCategory
              categoryId={categoryId}
              customization={categoryProductsCustomizations}
            />
          </section>

          <CategoriesSection />
        </main>
      </div>
    </>
  );
};
export default ProductsCategoryPage;
