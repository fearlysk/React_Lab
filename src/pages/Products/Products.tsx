import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";
import { getProducts } from "../../api/products";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    Promise.allSettled([getProducts(), getProducts(`?category=${category}`)])
      .then((data) =>
        data.map((item) => {
          if (item.status === "fulfilled") {
            return item.value;
          }
          return null;
        })
      )
      .then((data) => data.filter((item) => !!item))
      .then((data) => Promise.all(data))
      .then((data) => {
        setProducts(data[0]);
        setSortedProducts(data[1]);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      {category && (
        <div>
          <h2 className={styles.headline}>Products for: {category?.toUpperCase()}</h2>
          <div className={styles.productsList}>
            {sortedProducts.map((sortedProduct: IProduct) => (
              <ProductsCard key={sortedProduct.id} {...sortedProduct} />
            ))}
          </div>
        </div>
      )}
      {!category && (
        <>
          <h2 className={styles.headline}>All Products</h2>
          <div className={styles.productsList}>
            {products.map((product: IProduct) => (
              <ProductsCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
