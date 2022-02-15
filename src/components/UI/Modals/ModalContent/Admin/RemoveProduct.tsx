import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../../api/products";
import styles from "../ModalContent.module.scss";

interface Props {
  RemoveProductModalOpen: boolean;
  setRemoveProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  title: string;
}

function RemoveProduct({ RemoveProductModalOpen, setRemoveProductModalOpen, id, title }: Props) {
  const navigate = useNavigate();

  const deleteProductHandler = () => {
    deleteProduct(id).then(() => {
      navigate(0);
    });
  };

  if (!RemoveProductModalOpen) return null;

  return (
    <div>
      <div className={styles.modalContentFormWrapper}>
        <div className={styles.modalHeader}>
          <div>
            <h1 className={styles.headline}>Remove product</h1>
          </div>
          <div>
            <button type="button" className={styles.closeBtn} onClick={() => setRemoveProductModalOpen(false)}>
              X
            </button>
          </div>
        </div>
        <h3 className={styles.headline}>
          Are you sure you want to delete product <span className={styles.productTitle}>{title}</span> ?
        </h3>
        <div className={styles.confirmOptions}>
          <div className={styles.confirmOptionsItem}>
            <button type="button" className={styles.confirmOptionsItemBtn} onClick={deleteProductHandler}>
              Yes
            </button>
          </div>
          <div className={styles.confirmOptionsItem}>
            <button
              type="button"
              className={styles.confirmOptionsItemBtn}
              onClick={() => setRemoveProductModalOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveProduct;
