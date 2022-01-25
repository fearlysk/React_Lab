import * as yup from "yup";

export const SignInValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

export const SignUpValidationSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});
