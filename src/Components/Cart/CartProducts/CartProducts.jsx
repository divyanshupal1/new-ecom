import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import s from "./CartProducts.module.scss";
import { useCartStore } from "../../../store/useCartStore";
import { useEffect } from "react";

const CartProducts = () => {

  const {cart,getCart}= useCartStore((state) => ({
    cart: state.cart,
    getCart: state.getCart
  }));
  
  useEffect(()=>{
    getCart()
  },[])

  return (
    <table className={s.cartProducts}>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>

      <tbody>
        {
          cart?.items?.length == 0 ?           
          <tr><td colSpan="4">No items in cart</td></tr> 
          :
          cart?.items?.map((product) => (
            <CartProduct key={product._id} data={product} />
          ))
        }
      </tbody>
    </table>
  );
};
export default CartProducts;
