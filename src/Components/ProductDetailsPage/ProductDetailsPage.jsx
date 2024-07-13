import { Helmet } from "react-helmet-async";
import { productsData } from "../../Data/productsData";
import { capitalize } from "../../Functions/helper";
import useScrollOnMount from "../../Hooks/App/useScrollOnMount";
import useGetSearchParam from "../../Hooks/Helper/useGetSearchParam";
import PagesHistory from "../Shared/MiniComponents/PagesHistory";
import ProductDetails from "./ProductDetails/ProductDetails";
import s from "./ProductDetailsPage.module.scss";
import RelatedItemsSection from "./RelatedItemsSection/RelatedItemsSection";
import useProductStore from "../../store/useProductStore";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useEffect, useState } from "react";

const ProductDetailsPage = () => {

  useScrollOnMount(200);

  const PRODUCT_ID = useGetSearchParam("product");
  const [product, setProduct] = useState(undefined)

  const {fetchProductByID} = useProductStore((state)=>({fetchProductByID:state.fetchProductByID}))
  const {categories,fetchCategories} = useCategoryStore((state)=>({
    categories:state.categories,
    fetchCategories:state.fetchCategories
  }))  
  useEffect(() => {
    if (categories === undefined) fetchCategories();
  }, [categories]);

  const getProduct = async()=> {
    const res =  await fetchProductByID(PRODUCT_ID)
    setProduct(res)
  }
  useEffect(() => {
    getProduct()
  }, [PRODUCT_ID]);


  const history = ["Account", capitalize(categories?.[product?.category]?.name), product?.name?.toUpperCase()];
  const historyPaths = [
    {
      index: 0,
      path: "/profile",
    },
    {
      index: 1,
      path: `/category?type=${product?.category}`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>

      <div className="container">
        <main className={s.detailsPage} id="details-page">
          <PagesHistory history={history} historyPaths={historyPaths} />
          { product!=undefined && <ProductDetails product={product} />}
          {/* <RelatedItemsSection
            productType={category}
            currentProduct={PRODUCT_DATA}
          /> */}
        </main>
      </div>
    </>
  );
};
export default ProductDetailsPage;
