import IUserData from "@/interfaces/IUserData";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/userSlice";
import styles from "./Profile.module.scss";

function Profile() {
  const user: IUserData | null = useAppSelector(selectUser);

  return <div className={styles.profileWrapper}>{user ? <h3>Welcome, {user.firstName}</h3> : null}</div>;
}

export default Profile;
