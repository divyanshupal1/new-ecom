import { useSelector } from "react-redux";
import { wishListProductsCustomization } from "../../Data/staticData";
import useScrollOnMount from "../../Hooks/App/useScrollOnMount";
import ProductCard from "../Shared/ProductsCards/ProductCard";
import s from "./WishProducts.module.scss";

const WishProducts = () => {
  const { wishList } = useSelector((state) => state.products);
  useScrollOnMount(160);

  return (
    <div className={s.wishProducts}>
      {wishList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          customization={wishListProductsCustomization}
          removeFrom="wishList"
        />
      ))}
    </div>
  );
};
export default WishProducts;
