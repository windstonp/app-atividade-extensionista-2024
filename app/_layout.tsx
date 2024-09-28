import { Stack } from "expo-router";
import { SessionProvider } from "../providers/AuthProvider";

export default function Root() {
  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="(app)" />
      </Stack>
    </SessionProvider>
  );
}
