import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import routes from "../../constants/routes";
import styles from "./Header.module.scss";
import ICategory from "@/interfaces/ICategory";
import getCategories from "../../api/categories";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(`categories`).then((data) => setCategories(data));
  }, []);

  return (
    <div className={styles.header}>
      <h1 className={styles.headline}>
        <NavLink className={styles.homeLink} to={routes.HOME}>
          Game Store
        </NavLink>
      </h1>
      <div className={styles.nav}>
        <NavLink to={routes.HOME} className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>
          Home
        </NavLink>
        <div
          className={
            splitLocation[1] === "products"
              ? `${styles.active} ,  ${styles.products} ,  ${styles.navItem}`
              : `${styles.navItem} ,  ${styles.products}`
          }
        >
          <div className={styles.link}>
            <NavLink to={routes.PRODUCTS} className={styles.linkItem}>
              Products
            </NavLink>
          </div>
          <div className={styles.dropdownWrapper}>
            <ul className={styles.dropdown}>
              {categories.map((category: ICategory) => (
                <NavLink
                  key={category.id}
                  to={category.url}
                  onClick={() => {
                    window.location.href = category.url;
                  }}
                  className={({ isActive }) => (isActive ? `${styles.activeDropdownItem}` : `${styles.dropdownItem}`)}
                >
                  {category.name}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
        <NavLink to={routes.ABOUT} className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>
          About
        </NavLink>
        <div className={styles.navItem}>
          <button type="button" className={styles.navItemBtn}>
            Sign In
          </button>
        </div>
        <div className={styles.navItem}>
          <button type="button" className={styles.navItemBtn}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
