import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubTotal } from "../../../Functions/helper";
import s from "./CartInfoMenu.module.scss";
import { useCartStore } from "../../../store/useCartStore";

const CartInfoMenu = () => {
  
const {cart} = useCartStore((state)=>({cart: state.cart}));

  return (
    <div className={s.menu}>
      <b>Cart Total</b>

      <div className={s.content}>
        <div className={s.item}>
          <span>subTotal:</span>
          <span>₹{cart?.cartTotal}</span>
        </div>

        <div className={s.item}>
          <span>Coupon Discount:</span>
          <span>₹{cart?.cartTotal-cart?.discountedTotal}</span>
        </div>

        <div className={s.item}>
          <span>Shipping:</span>
          <span>Free</span>
        </div>

        <div className={s.item}>
          <span>Total:</span>
          <span>₹{cart?.discountedTotal}</span>
        </div>
      </div>

      <Link to="/checkout">Process to checkout</Link>
    </div>
  );
};
export default CartInfoMenu;
