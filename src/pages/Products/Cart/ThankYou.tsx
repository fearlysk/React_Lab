import { NavLink } from "react-router-dom";
import routes from "../../../constants/routes";
import styles from "./Cart.module.scss";

function ThankYou() {
  return (
    <div className={styles.thankYou}>
      <h2>Thank you for your order!</h2>
      <NavLink className={styles.thankYouLink} to={routes.PRODUCTS}>
        Return to products page
      </NavLink>
    </div>
  );
}

export default ThankYou;
