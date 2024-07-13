import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToArray } from "../../../../Features/productsSlice";
import SvgIcon from "../../MiniComponents/SvgIcon";
import s from "./AddToCartButton.module.scss";
import { useCartStore } from "../../../../store/useCartStore";
import { useUserStore } from "../../../../store/useUserStore";

const AddToCartButton = ({ product }) => {
  const navigateTo = useNavigate();
  
  const {cart,addTOCart} = useCartStore((state)=>({ cart:state.cart,addTOCart:state.addTOCart }))
  const {user} = useUserStore((state)=>({ user:state.user }))

  function addProductToCart() {
    const isProductAlreadyExist = cart?.items?.filter((item) => item._id === product._id).length > 0;
    if (user==null) navigateTo("/signup");
    if (isProductAlreadyExist) return;

    addTOCart(product._id);
    
  }

  return (
    <button
      type="button"
      className={`${s.addToCartBtn} ${s.addToCartButton}`}
      onClick={addProductToCart}
      aria-label="Add to cart"
      data-add-to-cart-button
    >
      <SvgIcon name="cart3" />
      <span>Add to cart</span>
    </button>
  );
};
export default AddToCartButton;
