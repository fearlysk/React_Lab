import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";
import fetchData from "../../api/fetchData";

function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData(`http://localhost:3000/products`).then((data) => setProducts(data));
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
