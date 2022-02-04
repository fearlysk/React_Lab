import { Rating } from "react-simple-star-rating";
import IProduct from "@/interfaces/IProduct";
import styles from "./ProductsCard.module.scss";

function ProductsCard({ image, category, title, price, genre, rating, description }: IProduct) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.productCard}>
        <div className={styles.front}>
          <img className={styles.productCardImg} src={image} alt="Not Found" />
          <hr />
          <div className={styles.productPlatforms}>
            <div className={styles.productPlatformsItem}>{category.toUpperCase()}</div>
          </div>
          <p>Title: {title}</p>
          <p>Price: {price}</p>
          <p>Genre: {genre}</p>
          <Rating ratingValue={rating * 20} />
        </div>
        <div className={styles.back}>
          <p>{description}</p>
          <h3 className={styles.productCardPagelink}>Open product page</h3>
          <button type="button" className={styles.cartBtn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
