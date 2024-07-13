import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProductPreview from "../ProductPreviw/ProductPreview";
import ProductColorsSection from "./ProductColorsSection";
import ProductDealingControls from "./ProductDealingControls";
import s from "./ProductDetails.module.scss";
import ProductFeatures from "./ProductFeatures";
import ProductFirstInfos from "./ProductFirstInfos";
import ProductSizes from "./ProductSizes";

const ProductDetails = ({ product }) => {

  const [{ previewImg, isZoomInPreviewActive },setZoom] =  useState({
    previewImg:product.mainImage,
    isZoomInPreviewActive:false
  })

  const zoomInImgRef = useRef();
  const activeClass = isZoomInPreviewActive ? s.active : "";

  function handleZoomInEffect(e) {
    const imgRect = e.target.getClientRects()[0];
    const xPosition = e.clientX - imgRect.left;
    const yPosition = e.clientY - imgRect.top;

    zoomInImgRef.current.style.transform = `translate(-${xPosition * 2}px, -${
      yPosition * 2
    }px)`;
  }

  return (
    <section className={s.detailsSection}>
      <ProductPreview data={product} previewImg={previewImg} handleZoomInEffect={handleZoomInEffect} setOptions={setZoom}/>

      <section className={s.details}>
        <div className={`${s.zoomInPreview} ${activeClass}`}>
          <img src={previewImg} alt="product preview" ref={zoomInImgRef} />
        </div>

        <ProductFirstInfos data={product} />

        <div className={s.horizontalLine} />

        {/* <ProductColorsSection data={product} /> */}
        {/* <ProductSizes data={product} /> */}
        <ProductDealingControls />
        <ProductFeatures />
      </section>
    </section>
  );
};
export default ProductDetails;
