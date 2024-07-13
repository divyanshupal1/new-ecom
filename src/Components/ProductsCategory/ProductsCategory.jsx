import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../Data/productsData";
import ProductCard from "../Shared/ProductsCards/ProductCard";
import s from "./ProductsCategory.module.scss";
import useScrollOnMount from "../../Hooks/App/useScrollOnMount";
// import { useCategoryStore } from "../../store/useCategoryStore";
import useProductStore from "../../store/useProductStore";

const ProductsCategory = ({ categoryId, customization }) => {

  const {products,fetchProductsByCategory} = useProductStore((state)=>({ 
    products:state.categoryProducts,
    fetchProductsByCategory:state.fetchProductsByCategory
  }))

  useEffect(() => {
    fetchProductsByCategory(categoryId,1,10)
  }, [categoryId]);

  console.log(products)
  const hasNoProducts = products?.length === 0;
  useScrollOnMount(200)

  if (hasNoProducts)
    return (
      <div className={s.notFoundMessage}>
        <p>Sorry We don't have any products in this category</p>
        <p>
          Back to the <Link to="/">Home page</Link>
        </p>
      </div>
    );

  return (
    <div className={s.products}>
      {products?.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          customization={customization}
        />
      ))}
    </div>
  );
};
export default ProductsCategory;
