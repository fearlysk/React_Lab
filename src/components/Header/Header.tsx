import { Link, useLocation } from "react-router-dom";
import constants from "../../constants/constants";
import HeaderStyles from "./Header.module.scss";
import HeaderProductsStyles from "./HeaderProducts.module.scss";

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className={HeaderStyles.header}>
      <h1 className={HeaderStyles.headline}>
        <Link className={HeaderStyles.homeLink} to={constants.HOME}>
          Game Store
        </Link>
      </h1>
      <div className={HeaderStyles.nav}>
        <div className={splitLocation[1] === "" ? HeaderStyles.active : HeaderStyles.navItem}>
          <Link className={HeaderStyles.navLink} to={constants.HOME}>
            Home
          </Link>
        </div>
        <div
          className={
            splitLocation[1] === "products"
              ? `${HeaderStyles.active} ,  ${HeaderStyles.products} ,  ${HeaderStyles.navItem}`
              : `${HeaderStyles.navItem} ,  ${HeaderStyles.products}`
          }
        >
          <div className={HeaderProductsStyles.link}>
            <Link className={HeaderProductsStyles.linkItem} to={constants.PRODUCTS}>
              Products
            </Link>
          </div>
          <div className={HeaderStyles.dropdownWrapper}>
            <ul className={HeaderStyles.dropdown}>
              <Link className={HeaderProductsStyles.linkItem} to={constants.PC}>
                <li className={HeaderProductsStyles.dropdownItem}>PC</li>
              </Link>
              <Link className={HeaderProductsStyles.linkItem} to={constants.XBOX}>
                <li className={HeaderProductsStyles.dropdownItem}>Xbox</li>
              </Link>
              <Link className={HeaderProductsStyles.linkItem} to={constants.PLAYSTATION}>
                <li className={HeaderProductsStyles.dropdownItem}>PlayStation</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className={splitLocation[1] === "about" ? HeaderStyles.active : HeaderStyles.navItem}>
          <Link className={HeaderProductsStyles.linkItem} to={constants.ABOUT}>
            About
          </Link>
        </div>
        <div className={HeaderStyles.navItem}>
          <button type="button" className={HeaderStyles.navItemBtn}>
            Sign In
          </button>
        </div>
        <div className={HeaderStyles.navItem}>
          <button type="button" className={HeaderStyles.navItemBtn}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
