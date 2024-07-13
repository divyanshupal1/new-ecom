import { useSelector } from "react-redux";
import IconWithCount from "../NavTools/IconWithCount";
import SearchProductsInput from "../NavTools/SearchProductsInput";
import UserMenuIcon from "../NavTools/UserMenuIcon";
import s from "./NavTools.module.scss";
import {useCartStore} from "../../../store/useCartStore";
import {useUserStore} from "../../../store/useUserStore";
import { useEffect } from "react";

const NavTools = ({ showHeart = true, showCart = true, showUser = true }) => {
  
  const { user,getUser  } = useUserStore((state) => ({
    user: state.user,
    getUser: state.getUser,
  }));
  const {cart,getCart} = useCartStore((state) => ({
    cart: state.cart,
    getCart: state.getCart,
  }));

  useEffect(()=>{
    if(user?.username!=undefined){
      getCart()
    }
  },[user])

  return (
    <div className={s.navTools}>
      {/* <SearchProductsInput /> */}

      <div className={s.tools}>
        <IconWithCount
          props={{
            visibility: showCart,
            iconName: "cart3",
            routePath: "/cart",
            countLength: cart?.items?.length,
            title: "cart",
          }}
        />

        <UserMenuIcon visibility={showUser} />
      </div>
    </div>
  );
};

export default NavTools;
