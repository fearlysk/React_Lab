import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IProduct from "@/interfaces/IProduct";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import fetchData from "../../api/fetchData";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData(`http://localhost:3000/products?${category}=true`).then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h2 className={styles.headline}>Products for: {category?.toUpperCase()}</h2>
      <div className={styles.productsList}>
        {products.map((product: IProduct) => (
          <ProductsCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
