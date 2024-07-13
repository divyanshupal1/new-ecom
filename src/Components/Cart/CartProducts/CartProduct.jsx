
import CustomNumberInput from "../../Shared/MiniComponents/CustomNumberInput";
import SvgIcon from "../../Shared/MiniComponents/SvgIcon";
import ToolTip from "../../Shared/MiniComponents/ToolTip";
import s from "./CartProduct.module.scss";
import { useCartStore } from "../../../store/useCartStore";

const CartProduct = ({ data }) => {
  const { product, quantity, _id } = data;
  const subTotal = (quantity * product?.price).toFixed(2);

  const {removeItem} = useCartStore((state)=>({
    removeItem:state.removeItem,
  }))

  const remove = () => {
    removeItem(product._id)
  }

  return (
    <tr className={s.productContainer}>
      <td className={s.product}>
        <div className={s.imgHolder}>
          <img src={product?.mainImage} alt={""} />

          <button
            type="button"
            className={s.removeButton}
            onClick={() => remove()}
          >
            <SvgIcon name="xMark" />
            <ToolTip top="50%" left="-44px" content="remove" />
          </button>
        </div>
        <span>{product?.name}</span>
      </td>

      <td className={s.price}>${product?.price}</td>

      <td>
        <CustomNumberInput product={product} quantity={quantity} />
      </td>

      <td>${subTotal}</td>
    </tr>
  );
};
export default CartProduct;
