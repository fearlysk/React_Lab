import { Rating } from "react-simple-star-rating";
import styles from "./ProductsCard.module.scss";

interface ProductsCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  genre: string;
  rating: number;
  category: string;
  description: string;
}

function ProductsCard(product: ProductsCardProps) {
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
          <p>Price: {product.price}</p>
          <p>Genre: {product.genre}</p>
          <Rating ratingValue={product.rating * 20} />
        </div>
        <div className={styles.back}>
          <p>{product.description}</p>
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
