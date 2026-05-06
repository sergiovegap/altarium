import ThemedView from "@/components/common/ThemedView";
import { useAuth } from "@/features/auth/AuthContext";
import { useState } from "react";
import { Button, TextInput } from "react-native";

const Register = () => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await signUp(email, password);
  };

  return (
    <ThemedView>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleRegister} />
    </ThemedView>
  );
};

export default Register;
