import { useEffect, useState } from "react";
import Loader from "../../../components/UI/Loader/Loader";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import {
  selectCart,
  addToCart,
  removeFromCart,
  selectTotalPrice,
  totalPrice,
  clearCartData,
} from "../../../redux/cartSlice";
import styles from "./Cart.module.scss";
import IProduct from "@/interfaces/IProduct";

function Cart() {
  const cart: IProduct[] | null = useAppSelector(selectCart);
  const total: number = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(totalPrice());
  });

  const setLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const thankYou = () => {
    setLoading();
    dispatch(clearCartData());
    window.location.replace("/thanks");
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && <Loader />}
      {cart.length ? (
        <div className={styles.cart}>
          <h1>Cart</h1>
          <div>
            {cart.map((product) => (
              <div key={product.id} className={styles.cartItem}>
                <div className={styles.cartItemInfo}>
                  <h3 className={styles.cartItemInfoItem}>Title: {product.title}</h3>
                  <h3 className={styles.cartItemInfoItem}>Id: {product.id}</h3>
                  <h3 className={styles.cartItemInfoItem}>Price: {product.price}$</h3>
                  <h3 className={styles.cartItemInfoItem}>Quantity: {product.quantity}</h3>
                </div>
                <div>
                  <button type="button" className={styles.cartItemInfoBtn} onClick={() => dispatch(addToCart(product))}>
                    Add
                  </button>
                  <button
                    type="button"
                    className={styles.cartItemInfoBtn}
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <h2 className={styles.cartItemInfoTotal}>Total: {product.price * product.quantity}$</h2>
                </div>
              </div>
            ))}
            <h2 className={styles.totalPrice}>Total Price: {total}$</h2>
            {cart.length ? (
              <button type="button" className={styles.orderBtn} onClick={thankYou}>
                Buy
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <h1>Cart is empty!</h1>
      )}
    </div>
  );
}

export default Cart;
