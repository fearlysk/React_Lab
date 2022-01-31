import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import Input from "../../../Input/Input";
import Modal from "../../Modal";
import { selectUser, updateUserData } from "../../../../../redux/userSlice";
import styles from "../UserAuth.module.scss";
import IUserData from "../../../../../interfaces/IUserData";
import { ChangeAvatarValidationSchema } from "../../../../../utils/schemas";
import { changeUserData } from "../../../../../api/user/user";

interface Props {
  AvatarModalOpen: boolean;
  setAvatarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeAvatar({ AvatarModalOpen, setAvatarModalOpen }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({
    mode: "onBlur",
    resolver: yupResolver(ChangeAvatarValidationSchema),
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
  });

  const dispatch = useAppDispatch();

  const updateUserInfo = (key: string, value: string) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const clearAvatar = () => {
    setUserData({
      ...userData,
      avatar: "",
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

  if (!AvatarModalOpen) return null;

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
          <h1 className={styles.headline}>Change Avatar</h1>
        </div>
        <div>
          <button type="button" className={styles.closeBtn} onClick={() => setAvatarModalOpen(false)}>
            X
          </button>
        </div>
      </div>
      <form className={styles.userAuthForm} onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          id="avatar"
          name="avatar"
          label="New avatar url: "
          register={register}
          value={userData.avatar}
          onChange={(e) => updateUserInfo(e.target.name, e.target.value) as never}
          error={errors.avatar}
          errorMessage="Invalid url!"
        />
        <br />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
      <button type="submit" onClick={clearAvatar} className={styles.submitBtn}>
        Clear value
      </button>
    </div>
  );
}

export default ChangeAvatar;
