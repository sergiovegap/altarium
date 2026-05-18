// React
import { createContext, useContext, useEffect, useState } from "react";
// Expo
import { router } from "expo-router";
// Supabase
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  loading: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthData>({
  loading: true,
  session: null,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
      } else {
        router.replace("/auth/login");
      }

      setLoading(false);
    }
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setLoading(false);

        if (session) {
          router.replace("/(app)/(tabs)/masses/calendar");
        } else {
          router.replace("/auth/login");
        }
      },
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
