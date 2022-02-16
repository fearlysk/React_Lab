import { useState, memo } from "react";
import { useLocation } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Modal from "../../../components/UI/Modals/Modal";
import EditProduct from "../../../components/UI/Modals/ModalContent/Admin/EditProduct";
import RemoveProduct from "../../../components/UI/Modals/ModalContent/Admin/RemoveProduct";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/userSlice";
import IProduct from "@/interfaces/IProduct";
import IUserData from "@/interfaces/IUserData";
import styles from "./ProductsCard.module.scss";
import { addToCart } from "../../../redux/cartSlice";
import Roles from "../../../enums/roles";

function ProductsCard(product: IProduct) {
  const location = useLocation();

  const user: IUserData | null = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const isEditable = user?.role === Roles.ADMIN && location.pathname === "/admin";

  const [EditProductModalOpen, setEditProductModalOpen] = useState(false);
  const [RemoveProductModalOpen, setRemoveProductModalOpen] = useState(false);

  const openEditProductModal = () => {
    setEditProductModalOpen(true);
    setRemoveProductModalOpen(false);
  };
  const openRemoveProductModal = () => {
    setRemoveProductModalOpen(true);
    setEditProductModalOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.wrapper}>
      <Modal modalOpen={EditProductModalOpen}>
        <EditProduct
          EditProductModalOpen={EditProductModalOpen}
          setEditProductModalOpen={setEditProductModalOpen}
          id={product.id}
        />
      </Modal>
      <Modal modalOpen={RemoveProductModalOpen}>
        <RemoveProduct
          RemoveProductModalOpen={RemoveProductModalOpen}
          setRemoveProductModalOpen={setRemoveProductModalOpen}
          id={product.id}
          title={product.title}
        />
      </Modal>
      <div className={styles.productCard}>
        <div className={styles.front}>
          <img className={styles.productCardImg} src={product.image} alt="Not Found" />
          <hr />
          <div className={styles.productPlatforms}>
            <div className={styles.productPlatformsItem}>{product.category.toUpperCase()}</div>
          </div>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}$</p>
          <p>Genre: {product.genre}</p>
          <Rating ratingValue={product.rating * 20} />
        </div>
        <div className={styles.back}>
          <p>{product.description}</p>
          <button type="button" onClick={addToCartHandler} className={styles.cartBtn}>
            Add to cart
          </button>
          {isEditable ? (
            <div>
              <button type="button" onClick={openEditProductModal} className={styles.cartBtn}>
                Edit
              </button>
              <button type="button" onClick={openRemoveProductModal} className={styles.cartBtn}>
                Remove
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductsCard);
