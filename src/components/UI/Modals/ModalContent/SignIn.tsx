import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../redux/hooks";
import { login } from "../../../../redux/userSlice";
import IUserData from "../../../../interfaces/IUserData";
import Input from "../../Input/Input";
import styles from "./UserAuth.module.scss";
import signIn from "../../../../api/auth/signIn";
import Modal from "../Modal";
import { SignInValidationSchema } from "../../../../utils/schemas";

type Props = {
  LoginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignIn({ LoginModalOpen, setLoginModalOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserData>({
    mode: "onBlur",
    resolver: yupResolver(SignInValidationSchema),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const dispatch = useAppDispatch();

  const formSubmitHandler = (uData: IUserData) => {
    const userData = {
      email: uData.email,
      password: uData.password,
    };

    signIn(userData).then((data) => {
      if (data[0] !== undefined) {
        dispatch(login(data[0]));
        window.location.reload();
      } else if (userData !== data[0]) {
        openModal();
      }
    });
    reset();
  };

  if (!LoginModalOpen) return null;

  return (
    <div className={styles.userAuthFormWrapper}>
      <Modal modalOpen={modalOpen}>
        <div className={styles.errorModal}>
          <h3>Invalid data! Try again!</h3>
          <button type="button" className={styles.closeBtn} onClick={closeModal}>
            OK
          </button>
        </div>
      </Modal>
      <div className={styles.modalHeader}>
        <div>
          <h1 className={styles.headline}>Sign In</h1>
        </div>
        <div>
          <button type="button" className={styles.closeBtn} onClick={() => setLoginModalOpen(false)}>
            X
          </button>
        </div>
      </div>
      <form className={styles.userAuthForm} onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          id="email"
          name="email"
          label="Email: "
          register={register}
          error={errors.email}
          errorMessage="Invalid email!"
        />
        <br />
        <Input
          id="password"
          name="password"
          label="Password: "
          register={register}
          error={errors.password}
          errorMessage="Password must be at least 4 characters long!"
        />
        <br />
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;
