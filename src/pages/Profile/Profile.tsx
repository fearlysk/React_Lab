import { useState } from "react";
import Modal from "../../components/UI/Modals/Modal";
import IUserData from "@/interfaces/IUserData";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
import styles from "./Profile.module.scss";
import ChangeAvatar from "../../components/UI/Modals/ModalContent/User/ChangeAvatar";
import ChangeUserInfo from "../../components/UI/Modals/ModalContent/User/ChangeUserInfo";
import ChangePassword from "../../components/UI/Modals/ModalContent/User/ChangePassword";

function Profile() {
  const user: IUserData | null = useAppSelector(selectUser);

  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const openAvatarModal = () => {
    setAvatarModalOpen(true);
    setUserInfoModalOpen(false);
    setPasswordModalOpen(false);
  };
  const openUserDataModal = () => {
    setUserInfoModalOpen(true);
    setAvatarModalOpen(false);
    setPasswordModalOpen(false);
  };
  const openPasswordModal = () => {
    setPasswordModalOpen(true);
    setUserInfoModalOpen(false);
    setAvatarModalOpen(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <Modal modalOpen={avatarModalOpen}>
        <ChangeAvatar AvatarModalOpen={avatarModalOpen} setAvatarModalOpen={setAvatarModalOpen} />
      </Modal>
      <Modal modalOpen={userInfoModalOpen}>
        <ChangeUserInfo userInfoModalOpen={userInfoModalOpen} setUserInfoModalOpen={setUserInfoModalOpen} />
      </Modal>
      <Modal modalOpen={passwordModalOpen}>
        <ChangePassword passwordModalOpen={passwordModalOpen} setPasswordModalOpen={setPasswordModalOpen} />
      </Modal>
      {user ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <h3>{user.firstName}`s Profile Page</h3>
          </div>
          <div className={styles.body}>
            <div className={styles.avatar}>
              {user.avatar ? (
                <img src={user.avatar} className={styles.avatarImage} key={user.avatar} alt="No avatar found" />
              ) : (
                <div className={styles.noAvatar}>
                  <h3 className={styles.noAvatarText}>NO AVATAR</h3>
                </div>
              )}
              <div>
                <button type="button" onClick={openAvatarModal} className={styles.btn}>
                  Change profile image
                </button>
              </div>
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.userInfoHeadline}>Info</h1>
              <h4>
                First name: <span className={styles.userInfoItem}>{user.firstName}</span>
              </h4>
              <h4>
                Last name: <span className={styles.userInfoItem}>{user.lastName}</span>
              </h4>
              <h4>
                Email: <span className={styles.userInfoItem}>{user.email}</span>
              </h4>
            </div>
            <div className={styles.userInfoButtons}>
              <h1 className={styles.userInfoHeadline}>Options</h1>
              <div>
                <button type="button" onClick={openUserDataModal} className={styles.btn}>
                  Change user data
                </button>
              </div>
              <div>
                <button type="button" onClick={openPasswordModal} className={styles.btn}>
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
