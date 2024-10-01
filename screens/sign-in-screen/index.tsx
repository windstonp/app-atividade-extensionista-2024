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
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/validators/signInSchema";
import { Link, useRouter } from "expo-router";
import { ISignInInterface } from "@/types/SignInInterface";
import { useSession } from "@/providers/AuthProvider";
import { httpClient } from "@/lib/apiClient";

export function SignInScreen() {
  const { signIn } = useSession();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInInterface>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: ISignInInterface) => {
    try {
      const { data: userInfo } = await httpClient.post("/sessions", {
        ...data,
      });

      signIn(
        JSON.stringify({
          ...userInfo,
        })
      );
      router.push("/(app)/chat");
    } catch (errors: any) {
      if (errors?.response?.data?.message) {
        Alert.alert("ERRO", errors.response.data.message, [{ text: "ok" }]);
      }
    }
  };

  return (
    <Container>
      <Title>Faça seu login</Title>

      <InputContainer>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Input
                placeholder="E-mail"
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
        <ButtonText>Logar</ButtonText>
      </Button>

      <SubText>
        Não tem uma conta?{" "}
        <Link href="/sign-up">
          <CustomLink>crie uma aqui.</CustomLink>
        </Link>
      </SubText>
    </Container>
  );
}
