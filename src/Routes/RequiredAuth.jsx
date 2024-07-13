import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import useGetParams from "../Hooks/Helper/useGetParams";

const RequiredAuth = ({ children }) => {
  const params = useGetParams();
  const {user} = useUserStore((state) => ({user: state.user}));
  const location = useLocation();
  const pathName = location.pathname;
  const isLoginOrSignUpPage = pathName === "/login" || pathName === "/signup";
  const pagesRequireSignIn = [
    "/favorites",
    "/checkout",
    "/profile",
    "/wishlist",
    "/cart",
  ];

  if (user===null) return children;

  const isPageRequiringSignIn = (isPage) =>
    pagesRequireSignIn.includes(isPage) && user?.username==undefined;

  if (isLoginOrSignUpPage && user?.username!=undefined) return <Navigate to={params?.path||'/'}/>;
  if (isPageRequiringSignIn(pathName)) return <Navigate to={"/signup?path="+pathName} />;

  return children;
};

export default RequiredAuth;
