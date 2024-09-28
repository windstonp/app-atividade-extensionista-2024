import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #222222;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 40px;
`;

export const InputContainer = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-size: 16px;
  border: none;
  ${Platform.select({
    android: "elevation: 5;",
    ios: `
      shadow-color: #000;
      shadow-opacity: 0.2;
      shadow-radius: 4px;
      shadow-offset: { width: 0, height: 2 };
    `,
  })}
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: #6f3083;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  ${Platform.select({
    android: "elevation: 5;",
    ios: `
      shadow-color: #000;
      shadow-opacity: 0.2;
      shadow-radius: 4px;
      shadow-offset: { width: 0, height: 2 };
    `,
  })}
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const SubText = styled.Text`
  color: #aaa;
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

export const CustomLink = styled.Text`
  color: #b388ff;
`;
