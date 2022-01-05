import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IProduct from "@/interfaces/IProduct";
import ProductsCard from "./ProductsCard/ProductsCard";
import styles from "./Products.module.scss";
import fetchProducts from "../../api/fetchProducts";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const filteredByCategory = products.filter(
    (product: IProduct) =>
      (product.pc === true && category === "pc") ||
      (product.xbox === true && category === "xbox") ||
      (product.playstation === true && category === "playstation")
  );

  return (
    <div>
      <h2 className={styles.headline}>Products for: {category?.toUpperCase()}</h2>
      <div className={styles.productsList}>
        {filteredByCategory.map((product: IProduct) => (
          <ProductsCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
