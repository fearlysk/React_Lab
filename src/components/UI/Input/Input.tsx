import { UseFormRegister, FieldValues, ChangeHandler } from "react-hook-form";
import styles from "./Input.module.scss";

export type InputData = {
  register: UseFormRegister<FieldValues>;
  error: object | undefined;
  label: string;
  id: string;
  errorMessage: string;
  name: string;
  avatar?: string;
  value?: string;
  image?: string;
  title?: string;
  price?: number;
  genre?: string;
  age?: number;
  rating?: number;
  category?: string;
  description?: string;
  quantity?: number;
  onChange?: ChangeHandler;
};

function Input({ register, error, label, id, errorMessage, ...inputProps }: InputData) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
        <input className={styles.textInput} placeholder={label} {...register(id, { required: true })} {...inputProps} />
        {error && <p className={styles.errorMessage}>{errorMessage}</p>}
      </label>
    </div>
  );
}

export default Input;
