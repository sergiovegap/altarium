// React
import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
// Expo
import { router, useLocalSearchParams } from "expo-router";
// Custom
import { useThemeColor } from "@/hooks/useThemeColor";

const VerifyEmail = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { accentColor, gold_600 } = useThemeColor();
  const [countdown, setCountdown] = useState(5);

  // El setInterval solo actualiza el contador
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // Cuando countdown llega a 0, el router.replace se ejecuta con setTimeout de 100ms
  useEffect(() => {
    if (countdown <= 0) {
      const timeout = setTimeout(() => router.replace("/auth/login"), 100);
      return () => clearTimeout(timeout);
    }
  }, [countdown]);

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-4xl">✉️</Text>
      <Text className="text-center text-2xl font-bold">Verificá tu cuenta</Text>
      <Text className="text-center text-base text-gray-600">
        Te enviamos un correo a{" "}
        <Text className="font-semibold text-black">{email}</Text>
      </Text>
      <Text className="text-center text-sm text-gray-500">
        Hacé clic en el enlace para activar tu cuenta y poder iniciar sesión.
      </Text>
      <View className="mt-4 w-full gap-3">
        <Pressable
          onPress={() => Linking.openURL(`mailto:${email}`)}
          className="rounded-lg p-3"
          style={{ backgroundColor: gold_600 }}
        >
          <Text className="text-center font-bold text-white">Abrir correo</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/auth/login")}
          className="rounded-lg border border-gray-300 p-3"
        >
          <Text
            className="text-center font-bold"
            style={{ color: accentColor }}
          >
            Ya verifiqué, iniciar sesión
          </Text>
        </Pressable>
      </View>
      <Text className="mt-4 text-sm text-gray-400">
        Serás redirigido en {countdown} segundos...
      </Text>
    </View>
  );
};

export default VerifyEmail;
