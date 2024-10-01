import React, { useEffect, useState } from "react";
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
import { httpClient } from "@/lib/apiClient";
import { useSession } from "@/providers/AuthProvider";

type Message = {
  chat_id: string;
  content: string;
  id: string;
  role: string;
};

export default function ChatScreen() {
  const [chatId, setChatId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { session, signIn } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);

  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    setIsLoading(true);
    const sessionJson = JSON.parse(session!);

    if (inputText.trim() === "") return;

    console.log(inputText);
    await httpClient.post(
      `/messages/${chatId}`,
      {
        content: inputText,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionJson.token}`,
          "x-access-token": `${sessionJson.token}`,
        },
      }
    );
    const { data: chat } = await httpClient.get(`/chats/${chatId}`, {
      headers: {
        Authorization: `Bearer ${sessionJson.token}`,
        "x-access-token": `${sessionJson.token}`,
      },
    });
    setMessages(chat.messages);
    setIsLoading(false);
    setInputText("");
  };

  useEffect(() => {
    async function createChat() {
      const sessionJson = JSON.parse(session!);
      const { data: token } = await httpClient.post(
        "/refresh-token",
        {},
        {
          headers: {
            "x-access-token": JSON.parse(session!).refresh_token,
          },
        }
      );
      signIn(
        JSON.stringify({
          ...sessionJson,
          token,
        })
      );
      const { data: chatData } = await httpClient.post(
        "/chats",
        {
          name: `${new Date().getTime()}-${token}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-access-token": `${token}`,
          },
        }
      );
      setChatId(chatData.id);
      const { data: chat } = await httpClient.get(`/chats/${chatData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-access-token": `${token}`,
        },
      });
      setMessages(chat.messages);
    }
    try {
      createChat();
    } catch (e) {}
  }, []);
  return (
    <Container>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageContainer isUser={item.role === "user" ? true : false}>
            <MessageText>{item.content}</MessageText>
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
          <SendButton onPress={sendMessage} disabled={isLoading}>
            <SendButtonText>Send</SendButtonText>
          </SendButton>
        </InputContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}
