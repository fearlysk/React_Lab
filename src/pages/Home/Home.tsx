import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductsCard from "../Products/ProductsCard/ProductsCard";
import styles from "./Home.module.scss";
import IProduct from "@/interfaces/IProduct";
import ICategory from "@/interfaces/ICategory";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import settlePromises from "../../utils/settlePromises";
import Modal from "../../components/UI/Modals/Modal";
import SignIn from "../../components/UI/Modals/ModalContent/SignIn";
import { UserContext } from "../../utils/UserContext";

function Home() {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [LoginModalOpen, setLoginModalOpen] = useState(false);

  const [user, setUser] = useContext(UserContext);
  const userData = localStorage.getItem("user-data");

  const promises = [getProducts(), getCategories()];

  useEffect(() => {
    setUser(JSON.parse(userData as string));
    settlePromises(promises).then((data) => {
      setProducts(data[0] as never);
      setCategories(data[1] as never);
    });
  }, []);

  const openLoginModal = () => {
    setModalOpen(true);
    setLoginModalOpen(true);
  };

  const ProductsClasses = [styles.productsWrapper];
  if (value === "") {
    ProductsClasses.push(styles.hidden);
  }

  const filteredProducts = products.filter((product: IProduct) =>
    product.title.toLowerCase().includes(value.toLowerCase())
  );
  const newProducts = products.slice(-3);

  return (
    <div className={styles.wrapper}>
      <Modal modalOpen={modalOpen}>
        <SignIn LoginModalOpen={LoginModalOpen} setLoginModalOpen={setLoginModalOpen} />
      </Modal>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <div className={ProductsClasses.join(" ")}>
        <h2 className={styles.headline}>Products</h2>
        <div className={styles.productsList}>
          {filteredProducts.map((product: IProduct) => (
            <ProductsCard key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesHeadline}>
          <h2 className={styles.categoriesHeadlineText}>Categories</h2>
        </div>
        <div className={styles.categories}>
          {categories.map((category: ICategory) => (
            <div key={category.id} className={styles.categoriesItem}>
              {user && (
                <Link className={styles.linkItem} to={category.url}>
                  <img src={category.logo} className={styles.categoriesItemLogo} alt="Not found" />
                  <h3 className={styles.categoriesItemTitle}>{category.name}</h3>
                </Link>
              )}
              {!user && (
                <Link onClick={openLoginModal} className={styles.linkItem} to="/">
                  <img src={category.logo} className={styles.categoriesItemLogo} alt="Not found" />
                  <h3 className={styles.categoriesItemTitle}>{category.name}</h3>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.newWrapper}>
        <div className={styles.newHeadline}>
          <h2 className={styles.newHeadlineText}>New In Store:</h2>
        </div>
        <div className={styles.new}>
          <div className={styles.wrapper}>
            <div className={styles.productsList}>
              {newProducts.map((product: IProduct) => (
                <ProductsCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
