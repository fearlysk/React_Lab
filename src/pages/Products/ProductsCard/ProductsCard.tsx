import styles from "./ProductsCard.module.scss";

interface ProductsCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  genre: string;
  rating: number;
  pc: boolean;
  xbox: boolean;
  playstation: boolean;
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
            {product.pc && <div className={styles.productPlatformsItem}>PC</div>}
            {product.xbox && <div className={styles.productPlatformsItem}>Xbox</div>}
            {product.playstation && <div className={styles.productPlatformsItem}>PS</div>}
          </div>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Genre: {product.genre}</p>
          <p>Rating: {product.rating}</p>
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
