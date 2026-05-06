import ThemedView from "@/components/common/ThemedView";
import { useAuth } from "@/features/auth/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native";

const Login = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <ThemedView>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      {error ? <Text>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
};

export default Login;
