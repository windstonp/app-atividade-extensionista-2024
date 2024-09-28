import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #666;
  padding: 20px;
`;

export const MessageContainer = styled.View<{ isUser: boolean }>`
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background-color: ${({ isUser }) => (isUser ? "#7b1fa2" : "#b388ff")};
  padding: 15px;
  margin: 10px 0px;
  border-radius: 15px;
  max-width: 75%;
`;

export const MessageText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #555;
  border-radius: 30px;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  color: #fff;
  font-size: 16px;
`;

export const SendButton = styled.TouchableOpacity`
  background-color: #b388ff;
  padding: 10px;
  border-radius: 30px;
  margin-left: 10px;
`;

export const SendButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
