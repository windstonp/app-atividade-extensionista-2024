import {
  useContext,
  createContext,
  type PropsWithChildren,
  useMemo,
} from "react";
import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const authContextValue = useMemo(
    () => ({
      signIn: () => {
        setSession("token");
      },
      signOut: () => {
        setSession(null);
      },
      session,
      isLoading,
    }),
    [session, isLoading, setSession]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
