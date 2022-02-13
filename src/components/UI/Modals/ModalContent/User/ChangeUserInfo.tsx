import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import Input from "../../../Input/Input";
import Modal from "../../Modal";
import { selectUser, updateUserData } from "../../../../../redux/userSlice";
import styles from "../ModalContent.module.scss";
import IUserData from "../../../../../interfaces/IUserData";
import { ChangeUserInfoValidationSchema } from "../../../../../utils/schemas";
import { changeUserData } from "../../../../../api/user/user";

interface Props {
  userInfoModalOpen: boolean;
  setUserInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeUserInfo({ userInfoModalOpen, setUserInfoModalOpen }: Props) {
  const navigate = useNavigate();

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
  const [userData, setUserData] = useState({
    avatar: user?.avatar,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
    role: user?.role,
  });

  const dispatch = useAppDispatch();

  const updateUserInfo = (key: string, value: string) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const formSubmitHandler = () => {
    const item = {
      ...userData,
    };

    changeUserData(id, item).then((resp: IUserData) => {
      if (resp) {
        dispatch(updateUserData(resp));
        navigate(0);
      } else {
        setModalOpen(true);
      }
    });
  };

  if (!userInfoModalOpen) return null;

  return (
    <div className={styles.modalContentFormWrapper}>
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
      <form className={styles.modalContentForm} onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          id="firstName"
          name="firstName"
          label="Update first name: "
          register={register}
          value={userData.firstName}
          onChange={(e) => updateUserInfo(e.target.name, e.target.value) as never}
          error={errors.firstName}
          errorMessage="First name must be at least 3 characters long!"
        />
        <br />
        <Input
          id="lastName"
          name="lastName"
          label="Update last name: "
          register={register}
          value={userData.lastName}
          onChange={(e) => updateUserInfo(e.target.name, e.target.value) as never}
          error={errors.lastName}
          errorMessage="Last name must be at least 3 characters long!"
        />
        <br />
        <Input
          id="email"
          name="email"
          label="Update email: "
          register={register}
          value={userData.email}
          onChange={(e) => updateUserInfo(e.target.name, e.target.value) as never}
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
