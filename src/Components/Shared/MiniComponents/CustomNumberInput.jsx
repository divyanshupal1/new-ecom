import { useDispatch, useSelector } from "react-redux";
import {
  MAXIMUM_QUANTITY,
  MINIMUM_QUANTITY,
} from "../../../Data/globalVariables";
import { updateState } from "../../../Features/productsSlice";
import s from "./CustomNumberInput.module.scss";
import SvgIcon from "./SvgIcon";
import { useCartStore } from "../../../store/useCartStore";

const CustomNumberInput = ({ product, quantity }) => {
  const { _id } = product;
  const {removeItem,addTOCart} = useCartStore((state)=>({
    removeItem:state.removeItem,
    addTOCart:state.addTOCart
  }))

  const increment = () => {
    addTOCart(_id,quantity+1)
  }
  const decrement = () => {
    if(quantity==1) removeItem(_id)
    else addTOCart(_id,quantity-1)
  }

  return (
    <div className={s.numberInput}>
      <input
        type="number"
        disabled
        value={quantity}
        // onChange={(e) => handleChangeQuantityInput(e)}
        min={1}
        max={product?.stock || MAXIMUM_QUANTITY}
      />

      <div className={s.buttons}>
        <button type="button" onClick={increment}>
          <SvgIcon name="arrowUp" />
        </button>

        <button type="button" onClick={decrement}>
          <SvgIcon name="arrowUp" />
        </button>
      </div>
    </div>
  );
};
export default CustomNumberInput;
