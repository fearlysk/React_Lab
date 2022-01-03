import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsCard from "../Products/ProductsCard/ProductsCard";
import HomeStyles from "./Home.module.scss";
import ProductsStyles from "../Products/Products.module.scss";
import WindowsLogo from "../../assets/images/windows-logo.png";
import XboxLogo from "../../assets/images/xbox-logo.png";
import PlayStationLogo from "../../assets/images/playstation-logo.png";
import constants from "../../constants/constants";
import IProduct from "@/interfaces/IProduct";

function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const [value, setValue] = useState("");

  const ProductsClasses = [ProductsStyles.wrapper];
  if (value === "") {
    ProductsClasses.push(ProductsStyles.hidden);
  }

  const filteredProducts = products.filter((product: IProduct) =>
    product.title.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className={HomeStyles.wrapper}>
      <div className={HomeStyles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          className={HomeStyles.searchInput}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className={ProductsClasses.join(" ")}>
        <h2 className={ProductsStyles.headline}>Products</h2>
        <div className={ProductsStyles.productsList}>
          {filteredProducts.map((product: IProduct) => (
            <ProductsCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              genre={product.genre}
              rating={product.rating}
              pc={product.pc}
              xbox={product.xbox}
              playstation={product.playstation}
              description={product.description}
            />
          ))}
        </div>
      </div>
      <div className={HomeStyles.categoriesWrapper}>
        <div className={HomeStyles.categoriesHeadline}>
          <h2 className={HomeStyles.categoriesHeadlineText}>Categories</h2>
        </div>
        <div className={HomeStyles.categories}>
          <div className={HomeStyles.categoriesItem}>
            <Link className={HomeStyles.linkItem} to={constants.PC}>
              <img src={WindowsLogo} className={HomeStyles.categoriesItemLogo} alt="Not found" />
              <h3 className={HomeStyles.categoriesItemTitle}>PC</h3>
            </Link>
          </div>
          <div className={HomeStyles.categoriesItem}>
            <Link className={HomeStyles.linkItem} to={constants.XBOX}>
              <img src={XboxLogo} className={HomeStyles.categoriesItemLogo} alt="Not found" />
              <h3 className={HomeStyles.categoriesItemTitle}>Xbox</h3>
            </Link>
          </div>
          <div className={HomeStyles.categoriesItem}>
            <Link className={HomeStyles.linkItem} to={constants.PLAYSTATION}>
              <img src={PlayStationLogo} className={HomeStyles.categoriesItemLogo} alt="Not found" />
              <h3 className={HomeStyles.categoriesItemTitle}>PlayStation</h3>
            </Link>
          </div>
        </div>
      </div>
      <div className={HomeStyles.newWrapper}>
        <div className={HomeStyles.newHeadline}>
          <h2 className={HomeStyles.newHeadlineText}>New In Store:</h2>
        </div>
        <div className={HomeStyles.new}>
          <div className={ProductsStyles.wrapper}>
            <div className={ProductsStyles.productsList}>
              {products.slice(-3).map((product: IProduct) => (
                <ProductsCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  genre={product.genre}
                  rating={product.rating}
                  pc={product.pc}
                  xbox={product.xbox}
                  playstation={product.playstation}
                  description={product.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
