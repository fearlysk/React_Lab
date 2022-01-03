import { useEffect, useState } from "react";
import ProductsCard from "./ProductsCard/ProductsCard";
import ProductsStyles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className={ProductsStyles.wrapper}>
      <h2 className={ProductsStyles.headline}>Products</h2>
      <div className={ProductsStyles.productsList}>
        {products.map((product: IProduct) => (
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
  );
}

export default Products;
