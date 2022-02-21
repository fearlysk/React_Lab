import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../Input/Input";
import { addProduct } from "../../../../../api/products";
import { productFieldsValidationSchema } from "../../../../../utils/schemas";
import IProduct from "@/interfaces/IProduct";
import styles from "../ModalContent.module.scss";

interface Props {
  CreateProductModalOpen: boolean;
  setCreateProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateProduct({ CreateProductModalOpen, setCreateProductModalOpen }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(productFieldsValidationSchema),
  });

  const formSubmitHandler = (pData: IProduct) => {
    const productData = {
      image: pData.image,
      title: pData.title,
      age: pData.age,
      rating: pData.rating,
      category: pData.category.toLowerCase(),
      genre: pData.genre,
      price: pData.price,
      description: pData.description,
      createdAt: new Date().getTime().toString(),
      quantity: 1,
    };

    addProduct(productData).then(() => {
      navigate(0);
    });

    reset();
  };

  if (!CreateProductModalOpen) return null;

  return (
    <div>
      <div className={styles.modalContentFormWrapper}>
        <div className={styles.modalHeader}>
          <div>
            <h1 className={styles.headline}>Create new product</h1>
          </div>
          <div>
            <button type="button" className={styles.closeBtn} onClick={() => setCreateProductModalOpen(false)}>
              X
            </button>
          </div>
        </div>
        <form className={styles.modalContentForm} onSubmit={handleSubmit(formSubmitHandler as never)}>
          <div className={styles.modalContentFormSection}>
            <div className={styles.modalContentFormSectionItem}>
              <Input
                id="image"
                name="image"
                label="Image: "
                register={register}
                error={errors.image}
                errorMessage="Invalid URL!"
              />
            </div>
            <div className={styles.modalContentFormSectionItem}>
              <Input
                id="title"
                name="title"
                label="Title: "
                register={register}
                error={errors.title}
                errorMessage="Invalid title!"
              />
            </div>
            <div className={styles.modalContentFormSectionItem}>
              <Input
                id="age"
                name="age"
                label="Age: "
                register={register}
                error={errors.age}
                errorMessage="Age must be from 12 to 18!"
              />
            </div>
            <div className={styles.modalContentFormSectionItem}>
              <Input
                id="rating"
                name="rating"
                label="Rating: "
                register={register}
                error={errors.rating}
                errorMessage="Rating must be from 1 to 5!"
              />
            </div>
          </div>

          <Input
            id="category"
            name="category"
            label="Category: "
            register={register}
            error={errors.category}
            errorMessage="Invalid category!"
          />
          <Input
            id="genre"
            name="genre"
            label="Genre: "
            register={register}
            error={errors.genre}
            errorMessage="Invalid genre!"
          />
          <Input
            id="price"
            name="price"
            label="Price: "
            register={register}
            error={errors.price}
            errorMessage="Price must be a number!"
          />
          <Input
            id="description"
            name="description"
            label="Description: "
            register={register}
            error={errors.description}
            errorMessage="Description must not be empty!"
          />
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
