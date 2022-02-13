import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import ProductsCard from "./ProductsCard/ProductsCard";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./Products.module.scss";
import IProduct from "@/interfaces/IProduct";
import { getProducts } from "../../api/products";
import settlePromises from "../../utils/settlePromises";
import objectToGetParams from "../../utils/urls";
import sortingOrders from "../../enums/sorting";

function Products() {
  const { category } = useParams();
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [categoryProductsTemp, setCategoryProductsTemp] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = objectToGetParams({ category });
  const promises = [getProducts(), getProducts(query)];

  const filteredProducts = products.filter((product: IProduct) =>
    product.title.toLowerCase().includes(value.toLowerCase())
  );

  const setLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const sortProducts = (option: never, order: string) => {
    setLoading();
    if (order === sortingOrders.ASC) {
      const sortedByAsc = products.sort((a: IProduct, b: IProduct) => a[option] - b[option]).slice();
      const sortedCategoryByAsc = categoryProducts.sort((a: IProduct, b: IProduct) => a[option] - b[option]).slice();

      setProducts(sortedByAsc);
      setCategoryProducts(sortedCategoryByAsc);
    } else if (order === sortingOrders.DESC) {
      const sortedByDesc = products.sort((a: IProduct, b: IProduct) => b[option] - a[option]).slice();
      const sortedCategoryByDesc = categoryProducts.sort((a: IProduct, b: IProduct) => b[option] - a[option]).slice();

      setProducts(sortedByDesc);
      setCategoryProducts(sortedCategoryByDesc);
    }
  };

  const filterByGenre = (genre?: string) => {
    setLoading();
    if (!genre) {
      setProducts(productsTemp);
      setCategoryProducts(categoryProductsTemp);
    } else {
      setProducts(productsTemp);
      setCategoryProducts(categoryProductsTemp);

      const filteredByGenre = productsTemp.filter((item: IProduct) => item.genre === genre).slice();
      const filteredCategoryByGenre = categoryProductsTemp.filter((item: IProduct) => item.genre === genre).slice();

      setProducts(filteredByGenre);
      setCategoryProducts(filteredCategoryByGenre);
    }
  };

  const filterByAge = (age: number) => {
    setLoading();
    setProducts(productsTemp);
    setCategoryProducts(categoryProductsTemp);

    const filteredByAge = productsTemp.filter((item: IProduct) => item.age <= age).slice();
    const filteredCategoryByAge = categoryProductsTemp.filter((item: IProduct) => item.age <= age).slice();

    setProducts(filteredByAge);
    setCategoryProducts(filteredCategoryByAge);
  };

  const [selectedRadioBtn, setSelectedRadioBtn] = useState(0);
  const selectRadio = (val: number): boolean => selectedRadioBtn === val;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn(parseInt(e.currentTarget.value, 10));
    filterByAge(parseInt(e.currentTarget.value, 10));
  };

  useEffect(() => {
    setLoading();
    settlePromises(promises).then((data) => {
      setProducts(data[0] as never);
      setProductsTemp(data[0] as never);
      setCategoryProducts(data[1] as never);
      setCategoryProductsTemp(data[1] as never);
    });
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <div className={styles.searchForm}>
        <h2 className={styles.searchFormHeadline}>Search by name:</h2>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.filtration}>
          <h1 className={styles.headline}>Filter Products</h1>
          <div className={styles.filtrationItem}>
            <h2 className={styles.headline}>Price: </h2>
            <button
              className={styles.filterOption}
              type="button"
              onClick={() => sortProducts("price" as never, sortingOrders.ASC)}
            >
              ASC
            </button>
            <button
              className={styles.filterOption}
              type="button"
              onClick={() => sortProducts("price" as never, sortingOrders.DESC)}
            >
              DESC
            </button>
          </div>
          <div className={styles.filtrationItem}>
            <h2 className={styles.headline}>Rating: </h2>
            <button
              className={styles.filterOption}
              type="button"
              onClick={() => sortProducts("rating" as never, sortingOrders.ASC)}
            >
              ASC
            </button>
            <button
              className={styles.filterOption}
              type="button"
              onClick={() => sortProducts("rating" as never, sortingOrders.DESC)}
            >
              DESC
            </button>
          </div>
          <div className={styles.filtrationItem}>
            <h2 className={styles.headline}>Genre: </h2>
            <button className={styles.filterOption} type="button" onClick={() => filterByGenre("Action")}>
              Action
            </button>
            <button className={styles.filterOption} type="button" onClick={() => filterByGenre("Shooter")}>
              Shooter
            </button>
            <button className={styles.filterOption} type="button" onClick={() => filterByGenre()}>
              All
            </button>
          </div>
          <div className={styles.filtrationItem}>
            <h2 className={styles.headline}>Age: </h2>
            <div className={styles.filterOptionRadio}>
              <label htmlFor="12">
                12+
                <input type="radio" name="12" value="12" checked={selectRadio(12)} onChange={handleRadioClick} />
              </label>
            </div>
            <div className={styles.filterOptionRadio}>
              <label htmlFor="12">
                16+
                <input type="radio" name="16" value="16" checked={selectRadio(16)} onChange={handleRadioClick} />
              </label>
            </div>
            <div className={styles.filterOptionRadio}>
              <label htmlFor="12">
                18+
                <input type="radio" name="16" value="18" checked={selectRadio(18)} onChange={handleRadioClick} />
              </label>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={classNames(styles.productsWrapper, { [styles.hidden]: !value })}>
            <h2 className={styles.headline}>Search: </h2>
            <div className={styles.productsList}>
              {filteredProducts.map((product: IProduct) => (
                <ProductsCard key={product.id} {...product} />
              ))}
              {!filteredProducts.length ? <h2 className={styles.headline}>Product not found</h2> : null}
            </div>
          </div>
          {category ? (
            <div>
              <h2 className={styles.headline}>Products for: {category?.toUpperCase()}</h2>
              <div className={styles.productsList}>
                {categoryProducts.map((sortedProduct: IProduct) => (
                  <ProductsCard key={sortedProduct.id} {...sortedProduct} />
                ))}
                {categoryProducts.length === 0 && <h2 className={styles.headline}>No results found</h2>}
              </div>
            </div>
          ) : (
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
      </div>
    </div>
  );
}

export default Products;
