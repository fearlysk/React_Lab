import { useEffect, useState, Suspense, lazy, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
import settlePromises from "../../utils/settlePromises";
import { getProducts } from "../../api/products";
import IUserData from "@/interfaces/IUserData";
import IProduct from "@/interfaces/IProduct";
import styles from "./Admin.module.scss";
import Modal from "../../components/UI/Modals/Modal";
import CreateProduct from "../../components/UI/Modals/ModalContent/Admin/CreateProduct";
import LazyProductCardLoading from "../../components/UI/Loader/LazyProductCardLoading";
import Roles from "../../enums/roles";

function Admin() {
  const ProductsCard = lazy(() => import("../Products/ProductsCard/ProductsCard"));

  const user: IUserData | null = useAppSelector(selectUser);

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [CreateProductModalOpen, setCreateProductModalOpen] = useState(false);

  const openCreateProductModal = () => {
    setCreateProductModalOpen(true);
  };

  const filteredProducts = useMemo(
    () => products.filter((product: IProduct) => product.title.toLowerCase().includes(value.toLowerCase())),
    [value, products]
  );

  const isAdmin = () => (user?.role !== Roles.ADMIN ? navigate("/") : null);

  const promises = [getProducts()];

  useEffect(() => {
    isAdmin();
    settlePromises(promises).then((data) => {
      setProducts(data[0] as never);
    });
  }, []);

  return (
    <div>
      <Modal modalOpen={CreateProductModalOpen}>
        <CreateProduct
          CreateProductModalOpen={CreateProductModalOpen}
          setCreateProductModalOpen={setCreateProductModalOpen}
        />
      </Modal>
      <h1 className={styles.pageHeadline}>Admin page</h1>
      <div className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="button" className={styles.createCardBtn} onClick={openCreateProductModal}>
          Create card
        </button>
      </div>
      <div className={classNames(styles.productsWrapper, { [styles.hidden]: !value })}>
        <h2 className={styles.headline}>Search:</h2>
        <div className={styles.productsList}>
          {filteredProducts.map((product: IProduct) => (
            <Suspense fallback={<LazyProductCardLoading />}>
              <ProductsCard key={product.id} {...product} />
            </Suspense>
          ))}
          {!filteredProducts.length ? <h2 className={styles.headline}>Product not found</h2> : null}
        </div>
      </div>
      <div>
        <h2 className={styles.headline}>Products</h2>
        <div className={styles.productsList}>
          {products.map((product: IProduct) => (
            <Suspense fallback={<LazyProductCardLoading />}>
              <ProductsCard key={product.id} {...product} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
