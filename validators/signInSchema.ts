import * as yup from "yup";

export const signInSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
        "O email é inválido"
      )
      .required("O campo E-mail é necessário!"),
    password: yup.string().required("O campo Senha é necessária!"),
  })
  .required();
