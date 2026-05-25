// React
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
// Expo
import { router } from "expo-router";
// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Custom
import CustomTextInput from "@/components/common/CustomTextInput";
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";

const LoginSchema = z.object({
  email: z.email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const Login = () => {
  const { accentColor } = useThemeColor();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);
      setError(null);

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (loginError) throw loginError;

      router.replace("/(app)/(tabs)/masses/calendar");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error inesperado");
      }
    }
  };

  return (
    <ThemedView className="flex-1 justify-center gap-4">
      <Text className="text-3xl font-bold">Iniciar sesión</Text>
      <View className="gap-1">
        <Text className="font-medium">Correo electrónico</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder="Correo electrónico"
              inputmode="email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              iconSource={require("@/assets/icons/mail-fill.png")}
              iconColor={"#d1d5db"}
            />
          )}
        />
      </View>
      <View className="gap-1">
        <Text className="font-medium">Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder="Contraseña"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              iconSource={require("@/assets/icons/key.png")}
              iconColor={"#d1d5db"}
            />
          )}
        />
      </View>

      {error ? (
        <Text className="text-center text-sm text-red-500">{error}</Text>
      ) : null}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-300 p-3"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="text-center font-bold text-white">Entrar</Text>
      </Pressable>

      <View className="flex-row justify-center gap-2">
        <Text>¿Aún no tienes una cuenta?</Text>
        <Pressable onPress={() => router.push("/auth/register")}>
          <Text className="font-bold">Regístrate</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
};

export default Login;
