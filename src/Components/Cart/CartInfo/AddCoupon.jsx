import { useEffect, useRef, useState } from "react";
import s from "./AddCoupon.module.scss";
import { useCartStore } from "../../../store/useCartStore";


const AddCoupon = () => {
  
  const {cart,applyCoupon,removeCoupon} = useCartStore((state)=>({
    cart: state.cart,
    applyCoupon: state.applyCoupon,
    removeCoupon: state.removeCoupon
  }));

  const [coupon, setCoupon] = useState(cart?.coupon?.couponCode || "");

  useEffect(() => {
    setCoupon(cart?.coupon?.couponCode || "");
  }, [cart]);


  return (
    <div className={s.couponContainer}>
      <input
        type="text"
        placeholder="Example SAVE20"
        value={coupon}
        disabled={cart?.coupon?.couponCode||false}
        onChange={(e) => setCoupon(e.target.value)}
      />

      <button type="button" onClick={()=>cart?.coupon?.couponCode ? removeCoupon(coupon) : applyCoupon(coupon)}>{cart?.coupon?.couponCode ? "Remove Coupon" : "Apply Coupon"}</button>
    </div>
  );
};
export default AddCoupon;
