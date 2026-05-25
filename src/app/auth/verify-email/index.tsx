// React
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
// Expo
import { router, useLocalSearchParams } from "expo-router";
// Third-party libraries
import * as MailComposer from "expo-mail-composer";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

const VerifyEmail = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const { accentColor, gold_600 } = useThemeColor();
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleOpenMail = async () => {
    setEmailError(null);
    const isAvailable = await MailComposer.isAvailableAsync();

    if (!isAvailable) {
      setEmailError(
        "No hay ninguna aplicación de correo configurada en el dispositivo",
      );
      return;
    }

    await MailComposer.composeAsync({ recipients: [email] });
  };

  return (
    <ThemedView className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-4xl">✉️</Text>

      <Text className="text-center text-2xl font-bold">Verifica tu cuenta</Text>

      <Text className="text-center text-base text-gray-600">
        Te enviamos un correo a{" "}
        <Text className="font-semibold text-black">{email}</Text>
      </Text>

      <Text className="text-center text-sm text-gray-500">
        Haz clic en el enlace para activar tu cuenta y poder iniciar sesión.
      </Text>

      <View className="mt-4 w-full gap-3">
        <Pressable
          onPress={handleOpenMail}
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
            Iniciar Sesión
          </Text>
        </Pressable>
      </View>

      {emailError && (
        <Text className="text-center text-sm text-red-500">{emailError}</Text>
      )}
    </ThemedView>
  );
};

export default VerifyEmail;
