import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import constants from "../../constants/constants";
import styles from "./Header.module.scss";
import productsStyles from "./HeaderProducts.module.scss";
import ICategory from "@/interfaces/ICategory";
import fetchCategories from "../../api/fetchCategories";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className={styles.header}>
      <h1 className={styles.headline}>
        <Link className={styles.homeLink} to={constants.HOME}>
          Game Store
        </Link>
      </h1>
      <div className={styles.nav}>
        <div className={splitLocation[1] === "" ? styles.active : styles.navItem}>
          <Link className={styles.navLink} to={constants.HOME}>
            Home
          </Link>
        </div>
        <div
          className={
            splitLocation[1] === "products"
              ? `${styles.active} ,  ${styles.products} ,  ${styles.navItem}`
              : `${styles.navItem} ,  ${styles.products}`
          }
        >
          <div className={productsStyles.link}>
            <Link className={productsStyles.linkItem} to={constants.PRODUCTS}>
              Products
            </Link>
          </div>
          <div className={styles.dropdownWrapper}>
            <ul className={styles.dropdown}>
              {categories.map((category: ICategory) => (
                <Link key={category.id} className={productsStyles.linkItem} to={category.url}>
                  <li className={productsStyles.dropdownItem}>{category.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div className={splitLocation[1] === "about" ? styles.active : styles.navItem}>
          <Link className={productsStyles.linkItem} to={constants.ABOUT}>
            About
          </Link>
        </div>
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
