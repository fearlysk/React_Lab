import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import Input from "../../../Input/Input";
import Modal from "../../Modal";
import { selectUser, updateUserData } from "../../../../../redux/userSlice";
import styles from "../UserAuth.module.scss";
import IUserData from "../../../../../interfaces/IUserData";
import { ChangeUserInfoValidationSchema } from "../../../../../utils/schemas";
import { getUserData, changeUserData } from "../../../../../api/user/user";

type Props = {
  userInfoModalOpen: boolean;
  setUserInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChangeUserInfo({ userInfoModalOpen, setUserInfoModalOpen }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({
    mode: "onBlur",
    resolver: yupResolver(ChangeUserInfoValidationSchema),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const user: IUserData | null = useAppSelector(selectUser);
  const id = user?.id;
  const [avatar, setAvatar] = useState(user?.avatar);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);

  const dispatch = useAppDispatch();

  function getUser() {
    getUserData(id).then((resp: IUserData) => {
      setAvatar(resp.avatar);
      setFirstName(resp.firstName);
      setLastName(resp.lastName);
      setEmail(resp.email);
      setPassword(resp.password);
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  const formSubmitHandler = () => {
    const item = {
      avatar,
      firstName,
      lastName,
      email,
      password,
    };

    changeUserData(id, item).then((resp: IUserData) => {
      if (resp) {
        dispatch(updateUserData(resp));
        getUser();
      } else {
        setModalOpen(true);
      }
    });

    window.location.reload();
  };

  if (!userInfoModalOpen) return null;

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
          <h1 className={styles.headline}>Change User Info</h1>
        </div>
        <div>
          <button type="button" className={styles.closeBtn} onClick={() => setUserInfoModalOpen(false)}>
            X
          </button>
        </div>
      </div>
      <form className={styles.userAuthForm} onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          id="firstName"
          name="firstName"
          label="Update first name: "
          register={register}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value) as never}
          error={errors.firstName}
          errorMessage="First name must be at least 3 characters long!"
        />
        <br />
        <Input
          id="lastName"
          name="lastName"
          label="Update last name: "
          register={register}
          value={lastName}
          onChange={(e) => setLastName(e.target.value) as never}
          error={errors.lastName}
          errorMessage="Last name must be at least 3 characters long!"
        />
        <br />
        <Input
          id="email"
          name="email"
          label="Update email: "
          register={register}
          value={email}
          onChange={(e) => setEmail(e.target.value) as never}
          error={errors.email}
          errorMessage="Invalid email!"
        />
        <br />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ChangeUserInfo;
