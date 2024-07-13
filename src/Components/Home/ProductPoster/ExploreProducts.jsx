import { productsData } from "../../../Data/productsData";
import useProductStore from "../../../store/useProductStore";
import ProductCard from "../../Shared/ProductsCards/ProductCard";
import s from "./ExploreProducts.module.scss";
import { useEffect } from "react";

const ExploreProducts = ({ numOfProducts = -1, customization }) => {
  const {products,fetchProducts} = useProductStore((state)=>({
    products:state.products,
    fetchProducts:state.fetchProducts
  }))


  if (!products) {
    return <div>Loading...</div>;
  }

  const filteredProducts = numOfProducts === -1 ? products : products.slice(0, numOfProducts);

  return (
    <div className={s.products}>
      {filteredProducts?.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          customization={customization}
        />
      ))}
    </div>
  );
};
export default ExploreProducts;
