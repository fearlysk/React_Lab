import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";
import { getProducts } from "../../api/products";
import promisesFilter from "../../utils/promisesFilter";
import objectToGetParams from "../../utils/urls";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const query = objectToGetParams({ category: `${category}` });
  const promises = [getProducts(), getProducts(query)];

  useEffect(() => {
    promisesFilter(promises).then((data) => {
      setProducts(data[0] as never);
      setSortedProducts(data[1] as never);
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
