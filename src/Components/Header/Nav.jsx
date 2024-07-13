import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.scss";
import { useUserStore } from "../../store/useUserStore";
import { useEffect } from "react";

const Nav = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        <li>
          {user?.username!=undefined ? (
            <NavLink to="/profile">Profile</NavLink>
          ) : (
            <NavLink to="/signup">Sign Up</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
