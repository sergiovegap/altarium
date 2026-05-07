import { useAuth } from "@/features/auth/AuthContextIA";
import { Button, Text, View } from "react-native";

const SignOut = () => {
  const { user, signOut } = useAuth();

  return (
    <View>
      <Text>{user?.email}</Text>
      <Button title="Cerrar sesión" onPress={signOut} />
    </View>
  );
};

export default SignOut;
