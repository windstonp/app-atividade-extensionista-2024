import React, { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import {
  Container,
  Input,
  InputContainer,
  MessageContainer,
  MessageText,
  SendButton,
  SendButtonText,
} from "./style";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I help you?", isUser: false },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage: Message = {
      id: Math.random().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simular uma resposta do bot
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Math.random().toString(),
          text: "Bot is typing...",
          isUser: false,
        },
      ]);
    }, 1000);

    setInputText("");
  };

  return (
    <Container>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageContainer isUser={item.isUser}>
            <MessageText>{item.text}</MessageText>
          </MessageContainer>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <InputContainer>
          <Input
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            value={inputText}
            onChangeText={setInputText}
          />
          <SendButton onPress={sendMessage}>
            <SendButtonText>Send</SendButtonText>
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
