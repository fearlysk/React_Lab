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

export const ChangeAvatarValidationSchema = yup.object().shape({
  avatar: yup.string().url().required(),
});

export const ChangeUserInfoValidationSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().email().required(),
});

export const passwordConfirmValidationSchema = yup.object().shape({
  password: yup.string().required().min(4),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});

export const productFieldsValidationSchema = yup.object().shape({
  image: yup.string().url().required(),
  title: yup.string().required(),
  age: yup.number().min(12).max(18).required(),
  rating: yup.number().min(1).max(5).required(),
  category: yup.string().required(),
  genre: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
});
