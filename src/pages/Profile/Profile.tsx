import { useContext, useEffect } from "react";
import { UserContext } from "../../utils/UserContext";
import styles from "./Profile.module.scss";

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const userData = localStorage.getItem("user-data");

  useEffect(() => {
    setUser(JSON.parse(userData as string));
  }, []);

  return <div className={styles.profileWrapper}>{user ? <h3>Welcome, {user.firstName}</h3> : null}</div>;
}

export default Profile;
