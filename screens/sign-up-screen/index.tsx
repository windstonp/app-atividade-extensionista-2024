import React from "react";
import { Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  ButtonText,
  Container,
  CustomLink,
  ErrorText,
  Input,
  InputContainer,
  SubText,
  Title,
} from "./style";
import { ISignUpInterface } from "@/types/SignUpInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validators/signUpSchema";
import { Link } from "expo-router";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInterface>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: ISignUpInterface) => {
    console.log(data);
    Alert.alert("Registration successful!", `Welcome, ${data.name}`);
  };

  return (
    <Container>
      <Title>Registre-se</Title>

      <InputContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                placeholder="Nome"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                placeholder="Email"
                placeholderTextColor="#888"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </>
          )}
        />
      </InputContainer>

      <Button onPress={handleSubmit(onSubmit)}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <SubText>
        Já possuí uma conta?{" "}
        <Link href="/sign-in">
          <CustomLink>faça seu login aqui</CustomLink>
        </Link>
      </SubText>
    </Container>
  );
}
