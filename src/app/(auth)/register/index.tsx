// React
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
// Expo
// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
// Curstom
import CustomTextInput from "@/components/common/CustomTextInput";
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";

const RegisterSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(20, "La contraseña debe tener como máximo 20 caracteres"),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

const Register = () => {
  const { accentColor } = useThemeColor();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      setLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (signUpError) throw signUpError;

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) throw signInError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView className="flex-1 justify-center gap-4">
      <Text className="text-3xl font-bold">Registrarse</Text>
      <View className="gap-1">
        <Text className="font-medium">Nombre</Text>
        <CustomTextInput
          placeholder="Nombre"
          // onChangeText={setEmail}
          iconSource={require("@/assets/icons/user-fill.png")}
          iconColor={"#d1d5db"}
        />
      </View>
      <View className="gap-1">
        <Text className="font-medium">Apellidos</Text>
        <CustomTextInput
          placeholder="Apellidos"
          // onChangeText={setEmail}
          iconSource={require("@/assets/icons/user-fill.png")}
          iconColor={"#d1d5db"}
        />
      </View>
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

      {Object.values(errors).map((err, i) => (
        <Text key={i} className="text-sm text-blue-500">
          {err.message}
        </Text>
      ))}
      {/* {error && <Text className="text-sm text-red-500">{error}</Text>} */}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-300 p-3"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="text-center font-bold text-white">Registrarse</Text>
      </Pressable>
    </ThemedView>
  );
};

export default Register;
