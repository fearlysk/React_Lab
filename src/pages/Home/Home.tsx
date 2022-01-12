import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsCard from "../Products/ProductsCard/ProductsCard";
import styles from "./Home.module.scss";
import IProduct from "@/interfaces/IProduct";
import ICategory from "@/interfaces/ICategory";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";

function Home() {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.allSettled([
      getProducts().then((data) => setProducts(data)),
      getCategories().then((data) => setCategories(data)),
    ]);
  }, []);

  const ProductsClasses = [styles.productsWrapper];
  if (value === "") {
    ProductsClasses.push(styles.hidden);
  }

  const filteredProducts = products.filter((product: IProduct) =>
    product.title.toLowerCase().includes(value.toLowerCase())
  );
  const newProducts = products.slice(-3);

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className={ProductsClasses.join(" ")}>
        <h2 className={styles.headline}>Products</h2>
        <div className={styles.productsList}>
          {filteredProducts.map((product: IProduct) => (
            <ProductsCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesHeadline}>
          <h2 className={styles.categoriesHeadlineText}>Categories</h2>
        </div>
        <div className={styles.categories}>
          {categories.map((category: ICategory) => (
            <div key={category.id} className={styles.categoriesItem}>
              <Link className={styles.linkItem} to={category.url}>
                <img src={category.logo} className={styles.categoriesItemLogo} alt="Not found" />
                <h3 className={styles.categoriesItemTitle}>{category.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.newWrapper}>
        <div className={styles.newHeadline}>
          <h2 className={styles.newHeadlineText}>New In Store:</h2>
        </div>
        <div className={styles.new}>
          <div className={styles.wrapper}>
            <div className={styles.productsList}>
              {newProducts.map((product: IProduct) => (
                <ProductsCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
