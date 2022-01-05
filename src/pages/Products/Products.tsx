import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";
import fetchProducts from "../../api/fetchProducts";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Outlet />
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
