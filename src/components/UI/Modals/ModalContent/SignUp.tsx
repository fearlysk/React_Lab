import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IUserData from "../../../../interfaces/IUserData";
import Input from "../../Input/Input";
import styles from "./UserAuth.module.scss";
import signUp from "../../../../api/auth/signUp";
import { SignUpValidationSchema } from "../../../../utils/schemas";

type Props = {
  RegModalOpen: boolean;
  setRegModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SignUp({ RegModalOpen, setRegModalOpen }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserData>({
    mode: "onBlur",
    resolver: yupResolver(SignUpValidationSchema),
  });

  const formSubmitHandler = (uData: IUserData) => {
    const userData = {
      firstName: uData.firstName,
      lastName: uData.lastName,
      email: uData.email,
      password: uData.password,
    };

    signUp(userData).then((data) => {
      if (data !== undefined) {
        localStorage.setItem("user-data", JSON.stringify(data));
        window.location.reload();
      }
    });
    reset();
  };

  if (!RegModalOpen) return null;

  return (
    <div className={styles.userAuthFormWrapper}>
      <div className={styles.modalHeader}>
        <div>
          <h1 className={styles.headline}>Sign Up</h1>
        </div>
        <div>
          <button type="button" className={styles.closeBtn} onClick={() => setRegModalOpen(false)}>
            X
          </button>
        </div>
      </div>
      <form className={styles.userAuthForm} onSubmit={handleSubmit(formSubmitHandler)}>
        <Input
          id="firstName"
          name="firstName"
          label="First name: "
          register={register}
          error={errors.firstName}
          errorMessage="First name must be at least 3 characters long!"
        />
        <br />
        <Input
          id="lastName"
          name="lastName"
          label="Last name: "
          register={register}
          error={errors.lastName}
          errorMessage="Last name must be at least 3 characters long!"
        />
        <br />
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

export default SignUp;
