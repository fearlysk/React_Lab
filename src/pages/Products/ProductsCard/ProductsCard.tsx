import ProductsCardStyles from "./ProductsCard.module.scss";
import IProduct from "@/interfaces/IProduct";

function ProductsCard(props: IProduct) {
  return (
    <div className={ProductsCardStyles.wrapper}>
      <div className={ProductsCardStyles.productCard}>
        <div className={ProductsCardStyles.front}>
          <img className={ProductsCardStyles.productCardImg} src={props.image} alt="Not Found" />
          <hr />
          <div className={ProductsCardStyles.productPlatforms}>
            {props.pc && <div className={ProductsCardStyles.productPlatformsItem}>PC</div>}
            {props.xbox && <div className={ProductsCardStyles.productPlatformsItem}>Xbox</div>}
            {props.playstation && <div className={ProductsCardStyles.productPlatformsItem}>PS</div>}
          </div>
          <p>Title: {props.title}</p>
          <p>Price: {props.price}</p>
          <p>Genre: {props.genre}</p>
          <p>Rating: {props.rating}</p>
        </div>
        <div className={ProductsCardStyles.back}>
          <p>{props.description}</p>
          <h3 className={ProductsCardStyles.productCardPagelink}>Open product page</h3>
          <button type="button" className={ProductsCardStyles.cartBtn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
