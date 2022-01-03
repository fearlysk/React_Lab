import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import IProduct from "@/interfaces/IProduct";
import ProductsCard from "./ProductsCard/ProductsCard";
import ProductsStyles from "./Products.module.scss";

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredByCategory = products.filter(
    (product: IProduct) =>
      (product.pc === true && category === "pc") ||
      (product.xbox === true && category === "xbox") ||
      (product.playstation === true && category === "playstation")
  );

  return (
    <div className={ProductsStyles.wrapper}>
      <h2 className={ProductsStyles.headline}>Products for: {category?.toUpperCase()}</h2>
      <div className={ProductsStyles.productsList}>
        {filteredByCategory.map((product: IProduct) => (
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

export default CategoryPage;
