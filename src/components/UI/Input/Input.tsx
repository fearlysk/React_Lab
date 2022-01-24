import { UseFormRegister, FieldValues } from "react-hook-form";
import styles from "./Input.module.scss";

type InputData = {
  register: UseFormRegister<FieldValues>;
  error: object | undefined;
  label: string;
  id: string;
  errorMessage: string;
  name: string;
};

function Input({ register, error, label, id, errorMessage, ...inputProps }: InputData) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.inputLabel} htmlFor={id}>
        {label}
        <input
          className={styles.textInput}
          placeholder={label}
          {...register(id, { required: true })}
          id={id}
          {...inputProps}
        />
        {error && <p className={styles.errorMessage}>{errorMessage}</p>}
      </label>
    </div>
  );
}

export default Input;
