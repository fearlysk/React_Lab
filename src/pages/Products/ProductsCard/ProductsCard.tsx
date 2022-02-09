import { Rating } from "react-simple-star-rating";
import { useAppDispatch } from "../../../redux/hooks";
import IProduct from "@/interfaces/IProduct";
import styles from "./ProductsCard.module.scss";
import { addToCart } from "../../../redux/cartSlice";

function ProductsCard(product: IProduct) {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.productCard}>
        <div className={styles.front}>
          <img className={styles.productCardImg} src={product.image} alt="Not Found" />
          <hr />
          <div className={styles.productPlatforms}>
            <div className={styles.productPlatformsItem}>{product.category.toUpperCase()}</div>
          </div>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}$</p>
          <p>Genre: {product.genre}</p>
          <Rating ratingValue={product.rating * 20} />
        </div>
        <div className={styles.back}>
          <p>{product.description}</p>
          <button type="button" onClick={addToCartHandler} className={styles.cartBtn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
