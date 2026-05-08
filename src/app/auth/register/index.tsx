// React
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
// Custom
import CustomTextInput from "@/components/common/CustomTextInput";
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const ROLES = ["Ministro Extraordinario", "Monaguillo"] as const;

const RegisterSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "Los apellidos son obligatorios"),
  email: z.string().min(1, "El correo es obligatorio").email("Correo inválido"),
  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(20, "La contraseña debe tener como máximo 20 caracteres"),
  role: z.enum(ROLES),
  parishId: z.string().min(1, "La parroquia es obligatoria"),
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

type Parish = {
  id: string;
  name: string;
};

const Register = () => {
  const { accentColor } = useThemeColor();

  const [parishes, setParishes] = useState<Parish[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showParishPicker, setShowParishPicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      role: "Monaguillo",
      parishId: "",
    },
  });

  const selectedRole = watch("role");
  const selectedParishId = watch("parishId");

  useEffect(() => {
    const loadParishes = async () => {
      const { data } = await supabase.from("parishes").select("id, name");
      if (data) setParishes(data);
    };
    loadParishes();
  }, []);

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      setLoading(true);
      setError(null);

      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            last_name: data.lastName,
            role: data.role,
            parish_id: data.parishId,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      } else {
        router.replace("/auth/login");
      }

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
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder="Nombre"
              value={value}
              onChangeText={onChange}
              iconSource={require("@/assets/icons/user-fill.png")}
              iconColor={"#d1d5db"}
            />
          )}
        />
      </View>

      <View className="gap-1">
        <Text className="font-medium">Apellidos</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <CustomTextInput
              placeholder="Apellidos"
              value={value}
              onChangeText={onChange}
              iconSource={require("@/assets/icons/user-fill.png")}
              iconColor={"#d1d5db"}
            />
          )}
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

      <View className="gap-1">
        <Text className="font-medium">Rol</Text>
        <SegmentedControl
          values={[...ROLES]}
          selectedIndex={selectedRole === "Ministro Extraordinario" ? 0 : 1}
          onChange={(event) => {
            setValue("role", ROLES[event.nativeEvent.selectedSegmentIndex]);
          }}
          tintColor={accentColor}
          activeFontStyle={{ color: "white" }}
        />
      </View>

      <View className="gap-1">
        <Text className="font-medium">Parroquia</Text>
        <Pressable
          onPress={() => setShowParishPicker(true)}
          className="flex-row items-center rounded-lg border border-gray-300 p-3"
        >
          <Text className={selectedParishId ? "text-black" : "text-gray-400"}>
            {selectedParishId
              ? parishes.find((p) => p.id === selectedParishId)?.name
              : "Seleccionar parroquia"}
          </Text>
        </Pressable>
        <Modal
          visible={showParishPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowParishPicker(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/50 px-6"
            onPress={() => setShowParishPicker(false)}
          >
            <Pressable
              className="max-h-96 rounded-xl bg-white p-4"
              onPress={() => {}}
            >
              <Text className="mb-4 text-lg font-bold">
                Seleccionar parroquia
              </Text>
              <FlatList
                data={parishes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setValue("parishId", item.id);
                      setShowParishPicker(false);
                    }}
                    className={`rounded-lg px-4 py-3 ${
                      selectedParishId === item.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <Text
                      className={
                        selectedParishId === item.id
                          ? "font-medium text-blue-600"
                          : "text-gray-700"
                      }
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>

      {Object.values(errors).map((err, i) => (
        <Text key={i} className="text-sm text-blue-500">
          {err.message}
        </Text>
      ))}
      {error && <Text className="text-sm text-red-500">{error}</Text>}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        className="rounded-lg border border-gray-300 p-3"
        style={{ backgroundColor: accentColor }}
      >
        <Text className="text-center font-bold text-white">
          {loading ? "Registrando..." : "Registrarse"}
        </Text>
      </Pressable>
    </ThemedView>
  );
};

export default Register;
