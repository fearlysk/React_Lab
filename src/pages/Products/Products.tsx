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
    Promise.allSettled([
      getProducts().then((data) => setProducts(data)),
      getProducts(`?category=${category}`).then((data) => setSortedProducts(data)),
    ]);
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
