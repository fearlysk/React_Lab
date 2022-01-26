import IUserData from "@/interfaces/IUserData";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
import styles from "./Profile.module.scss";

function Profile() {
  const user: IUserData = useAppSelector(selectUser);
  const isUserLoggedIn = Object.keys(user).length;

  return <div className={styles.profileWrapper}>{isUserLoggedIn ? <h3>Welcome, {user.firstName}</h3> : null}</div>;
}

export default Profile;
