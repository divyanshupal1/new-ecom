import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToArray, removeById } from "../../../Features/productsSlice";
import { checkDateBeforeMonthToPresent } from "../../../Functions/helper";
import SvgIcon from "../MiniComponents/SvgIcon";
import ToolTip from "../MiniComponents/ToolTip";
import s from "./ProductCard.module.scss";
import AddToCartButton from "./ProductCardComponents/AddToCartButton";
import ProductCardInfo from "./ProductCardComponents/ProductCardInfo";

const ProductCard = ({
  product,
  customization = {
    stopHover: false,
    showDiscount: true,
    showFavIcon: true,
    showDetailsIcon: true,
    showRemoveIcon: true,
    showNewText: false,
    showWishList: true,
    showColors: false,
  },
  removeFrom,
}) => {
  const {
    name,
    category,
    price,
    stock,
    description,
    mainImage,
    subImages,
    variants,
    _id,
  } = product;
  const {
    stopHover,
    showDiscount,
    showFavIcon,
    showDetailsIcon,
    showRemoveIcon,
    showNewText,
    showWishList,
    showColors,
  } = customization;
  const noHoverClass = stopHover ? s.noHover : "";
  // const hideDiscountClass = discount <= 0 || !showDiscount ? s.hide : "";
  // const hideNewClass = shouldHideNewWord();
  const navigateTo = useNavigate();


  function navigateToProductDetails() {
    navigateTo(`/details?product=${_id}`);
  }


  return (
    <div className={`${s.card} ${noHoverClass}`}>
      <div className={s.productImg}>
        <div className={s.imgHolder}>
          <img
            src={mainImage}
            alt={name}
            aria-label={name}
            onClick={navigateToProductDetails}
          />
        </div>

        <div className={s.layerContent}>
          {/* {hideNewClass && (
            <div className={`${s.discount} ${hideDiscountClass}`}>
              -{discount}%
            </div>
          )} */}

          {/* <div className={`${s.new} ${hideNewClass}`}>New</div> */}

          <div className={s.icons}>
            {/* {showFavIcon && (
              <button
                type="button"
                className={`${s.iconHolder} ${s.favIcon} 
                ${""
                  // isAddedToFavorites ? s.active : ""
                }
                `}
                onClick={()=>{}}
                aria-label="Favorite"
              >
                <div className={s.heartBackground}></div>
                <SvgIcon name="heart" />
                <ToolTip top="18px" left="-44px" content="Favorite" />
              </button>
            )} */}

            {showDetailsIcon && (
              <Link
                onClick={navigateToProductDetails}
                className={`${s.iconHolder} ${s.detailsIcon}`}
                aria-label="Details"
              >
                <SvgIcon name="eye" />
                <ToolTip top="18px" left="-39px" content="Details" />
              </Link>
            )}

            {showRemoveIcon && (
              <button
                type="button"
                className={`${s.iconHolder} ${s.removeIcon}`}
                aria-label={`Remove from ${removeFrom}`}
                onClick={() => {}}
              >
                <SvgIcon name="trashCan" />
                <ToolTip top="18px" left="-41px" content="Remove" />
              </button>
            )}

            {/* {showWishList && (
              <button
                type="button"
                className={`${s.iconHolder} ${s.wishListIcon} ${""
                  // isAddedToWishList ? s.active : ""
                }`}
                onClick={()=>{}}
                aria-label="Add to wishlist"
              >
                <SvgIcon name="save" />
                <ToolTip top="18px" left="-41px" content="Wishlist" />
              </button>
            )} */}
          </div>

          <AddToCartButton hoverDataAttribute={true} product={product} />
        </div>
      </div>

      <ProductCardInfo
        product={product}
        showColors={showColors}
        navigateToProductDetails={navigateToProductDetails}
      />
    </div>
  );
};
export default ProductCard;
