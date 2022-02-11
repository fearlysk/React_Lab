import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import routes from "../../constants/routes";
import styles from "./Header.module.scss";
import ICategory from "@/interfaces/ICategory";
import { getCategories } from "../../api/categories";
import Modal from "../UI/Modals/Modal";
import SignIn from "../UI/Modals/ModalContent/SignIn";
import SignUp from "../UI/Modals/ModalContent/SignUp";
import { selectUser, logout } from "../../redux/userSlice";
import { selectCartCounter } from "../../redux/cartSlice";
import IUserData from "@/interfaces/IUserData";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const [categories, setCategories] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [LoginModalOpen, setLoginModalOpen] = useState(false);
  const [RegModalOpen, setRegModalOpen] = useState(false);

  const user: IUserData | null = useAppSelector(selectUser);
  const cartCounter: number = useAppSelector(selectCartCounter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const openLoginModal = () => {
    setModalOpen(true);
    setLoginModalOpen(true);
    setRegModalOpen(false);
  };
  const openRegModal = () => {
    setModalOpen(true);
    setLoginModalOpen(false);
    setRegModalOpen(true);
  };
  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div className={styles.header}>
          <Modal modalOpen={modalOpen}>
            <SignIn LoginModalOpen={LoginModalOpen} setLoginModalOpen={setLoginModalOpen} />
          </Modal>
          <Modal modalOpen={modalOpen}>
            <SignUp RegModalOpen={RegModalOpen} setRegModalOpen={setRegModalOpen} />
          </Modal>
          <h1 className={styles.headline}>
            <NavLink className={styles.homeLink} to={routes.HOME}>
              Game Store
            </NavLink>
          </h1>
          <div className={styles.nav}>
            <NavLink to={routes.HOME} className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>
              Home
            </NavLink>
            <div
              className={
                splitLocation[1] === "products"
                  ? `${styles.active} ,  ${styles.products} ,  ${styles.navItem}`
                  : `${styles.navItem} ,  ${styles.products}`
              }
            >
              <div className={styles.link}>
                <NavLink to={routes.PRODUCTS} className={styles.linkItem}>
                  Products
                </NavLink>
              </div>
              <div className={styles.dropdownWrapper}>
                <ul className={styles.dropdown}>
                  {categories.map((category: ICategory) => (
                    <NavLink
                      key={category.id}
                      to={category.url}
                      onClick={() => {
                        window.location.href = category.url;
                      }}
                      className={({ isActive }) =>
                        isActive ? `${styles.activeDropdownItem}` : `${styles.dropdownItem}`
                      }
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </ul>
              </div>
            </div>

            <NavLink to={routes.ABOUT} className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>
              About
            </NavLink>

            <NavLink
              to={`${routes.PROFILE}/${user.id}`}
              className={({ isActive }) => (isActive ? styles.active : styles.navItem)}
            >
              {user.avatar ? (
                <div className={styles.avatarImageWrapper}>
                  <img src={user.avatar} className={styles.avatarImage} key={user.avatar} alt="No avatar found" />
                </div>
              ) : (
                <div className={styles.noAvatar}>
                  <h3 className={styles.noAvatarText}>NO AVATAR</h3>
                </div>
              )}
              {user.firstName}
            </NavLink>

            <div className={styles.navItem}>
              <NavLink to={`${routes.CART}`} className={styles.navItemBtn}>
                Cart: {cartCounter}
              </NavLink>
            </div>

            <div className={styles.navItem}>
              <button type="button" onClick={logOut} className={styles.navItemBtn}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <Modal modalOpen={modalOpen}>
            <SignIn LoginModalOpen={LoginModalOpen} setLoginModalOpen={setLoginModalOpen} />
          </Modal>
          <Modal modalOpen={modalOpen}>
            <SignUp RegModalOpen={RegModalOpen} setRegModalOpen={setRegModalOpen} />
          </Modal>
          <h1 className={styles.headline}>
            <NavLink className={styles.homeLink} to={routes.HOME}>
              Game Store
            </NavLink>
          </h1>
          <div className={styles.nav}>
            <NavLink to={routes.HOME} className={({ isActive }) => (isActive ? styles.active : styles.navItem)}>
              Home
            </NavLink>
            <div
              className={
                splitLocation[1] === "products"
                  ? `${styles.active} ,  ${styles.products} ,  ${styles.navItem}`
                  : `${styles.navItem} ,  ${styles.products}`
              }
            >
              <div className={styles.link}>
                <NavLink onClick={openLoginModal} to="/" className={styles.linkItem}>
                  Products
                </NavLink>
              </div>
              <div className={styles.dropdownWrapper}>
                <ul className={styles.dropdown}>
                  {categories.map((category: ICategory) => (
                    <NavLink key={category.id} to="/" onClick={openLoginModal} className={styles.dropdownItem}>
                      {category.name}
                    </NavLink>
                  ))}
                </ul>
              </div>
            </div>

            <NavLink onClick={openLoginModal} to="/" className={styles.navItem}>
              About
            </NavLink>

            <div className={styles.navItem}>
              <button type="button" onClick={openLoginModal} className={styles.navItemBtn}>
                Sign In
              </button>
            </div>

            <div className={styles.navItem}>
              <button type="button" onClick={openRegModal} className={styles.navItemBtn}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
