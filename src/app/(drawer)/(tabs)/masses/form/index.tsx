// React
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
// Expo
import { router, useLocalSearchParams } from "expo-router";
// Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useProfile } from "@/features/auth/useProfile";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { Image } from "expo-image";

type Priest = { id: string; name: string; last_name: string };
type ProfileRef = { id: string; name: string; last_name: string };

const MassSchema = z.object({
  day: z.date({ error: "La fecha es obligatoria" }),
  time: z.date({ error: "La hora es obligatoria" }),
  priestId: z.string().min(1, "El sacerdote es obligatorio"),
  ministers: z.array(z.string()),
  altarBoys: z.array(z.string()),
});

type MassSchemaType = z.infer<typeof MassSchema>;

const MassForm = () => {
  const { accentColor, gray_400 } = useThemeColor();
  const { day: dayParam } = useLocalSearchParams<{ day: string }>();
  const { profile } = useProfile();

  const [priests, setPriests] = useState<Priest[]>([]);
  const [availableMinisters, setAvailableMinisters] = useState<ProfileRef[]>(
    [],
  );
  const [availableAltarBoys, setAvailableAltarBoys] = useState<ProfileRef[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPriestPicker, setShowPriestPicker] = useState(false);
  const [showMinisterPicker, setShowMinisterPicker] = useState(false);
  const [showAltarBoyPicker, setShowAltarBoyPicker] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const initialDate = dayParam ? new Date(dayParam + "T12:00:00") : new Date();
  const initialTime = new Date();
  initialTime.setHours(8, 0, 0, 0);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MassSchemaType>({
    resolver: zodResolver(MassSchema),
    defaultValues: {
      day: initialDate,
      time: initialTime,
      priestId: "",
      ministers: [],
      altarBoys: [],
    },
  });

  const selectedPriestId = watch("priestId");
  const selectedMinisters = watch("ministers");
  const selectedAltarBoysWatched = watch("altarBoys");

  // ── Load data ──────────────────────────────────────────
  useEffect(() => {
    if (!profile?.parish_id) return;

    const loadData = async () => {
      const [priestsRes, ministersRes, altarBoysRes] = await Promise.all([
        supabase
          .from("priests")
          .select("id, name, last_name")
          .eq("parish_id", profile.parish_id),
        supabase
          .from("profiles")
          .select("id, name, last_name")
          .eq("role", "Ministro Extraordinario")
          .eq("parish_id", profile.parish_id),
        supabase
          .from("profiles")
          .select("id, name, last_name")
          .eq("role", "Monaguillo")
          .eq("parish_id", profile.parish_id),
      ]);

      if (priestsRes.data) setPriests(priestsRes.data);
      if (ministersRes.data) setAvailableMinisters(ministersRes.data);
      if (altarBoysRes.data) setAvailableAltarBoys(altarBoysRes.data);
    };

    loadData();
  }, [profile?.parish_id]);

  // ── Helpers ────────────────────────────────────────────
  const getPriestName = (id: string) => {
    const p = priests.find((p) => p.id === id);
    return p ? `${p.name} ${p.last_name}` : "Seleccionar sacerdote";
  };

  const getProfileName = (id: string, list: ProfileRef[]) => {
    const p = list.find((p) => p.id === id);
    return p ? `${p.name} ${p.last_name}` : id;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const openPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  // ── Submit ─────────────────────────────────────────────
  const onSubmit = async (data: MassSchemaType) => {
    try {
      setLoading(true);
      setError(null);

      const dayStr = data.day.toISOString().split("T")[0];
      const timeStr = formatTime(data.time);

      const { data: mass, error: massError } = await supabase
        .from("masses")
        .insert({
          day: dayStr,
          time: timeStr + ":00",
          priest_id: data.priestId,
          parish_id: profile?.parish_id,
        })
        .select()
        .single();

      if (massError) throw massError;

      if (data.ministers.length > 0) {
        const { error: e } = await supabase
          .from("ministers_masses")
          .insert(
            data.ministers.map((id) => ({ mass_id: mass.id, minister_id: id })),
          );
        if (e) throw e;
      }

      if (data.altarBoys.length > 0) {
        const { error: e } = await supabase.from("altar_boys_masses").insert(
          data.altarBoys.map((id) => ({
            mass_id: mass.id,
            altar_boy_id: id,
          })),
        );
        if (e) throw e;
      }

      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  // ── Unselected pools for single-add modals ──────────────
  const unselectedMinisters = availableMinisters.filter(
    (m) => !selectedMinisters.includes(m.id),
  );
  const unselectedAltarBoys = availableAltarBoys.filter(
    (a) => !selectedAltarBoysWatched.includes(a.id),
  );

  // ── Render ─────────────────────────────────────────────
  return (
    <ThemedView className="flex-1 p-4">
      <Text className="mb-6 text-2xl font-bold">Registrar nueva Misa</Text>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ═══ Fecha ═══ */}
        <View className="mb-4">
          <Text className="mb-1 font-medium">Fecha</Text>
          <Pressable
            onPress={() => openPicker("date")}
            className="rounded-lg border border-gray-300 p-3"
          >
            <Text className="text-black">{formatDate(watch("day"))}</Text>
          </Pressable>
          {errors.day && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.day.message}
            </Text>
          )}
        </View>

        {/* ═══ Hora ═══ */}
        <View className="mb-4">
          <Text className="mb-1 font-medium">Hora</Text>
          <Pressable
            onPress={() => openPicker("time")}
            className="rounded-lg border border-gray-300 p-3"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-black">{formatTime(watch("time"))}</Text>
              <Image
                source={require("@/assets/icons/arrow-up-down.png")}
                style={{ width: 20, height: 20, tintColor: gray_400 }}
              />
            </View>
          </Pressable>
          {errors.time && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.time.message}
            </Text>
          )}
        </View>

        {/* ═══ Native Picker (date + time) ═══ */}
        {showPicker && (
          <DateTimePicker
            value={pickerMode === "date" ? watch("day") : watch("time")}
            mode={pickerMode}
            is24Hour
            onValueChange={(_, date) => {
              if (Platform.OS === "android") setShowPicker(false);
              if (date) setValue(pickerMode === "date" ? "day" : "time", date);
            }}
            onDismiss={() => {
              if (Platform.OS === "android") setShowPicker(false);
            }}
          />
        )}

        {/* ═══ Sacerdote ═══ */}
        <View className="mb-4">
          <Text className="mb-1 font-medium">Sacerdote</Text>
          <Pressable
            onPress={() => setShowPriestPicker(true)}
            className="rounded-lg border border-gray-300 p-3"
          >
            <View className="flex-row items-center justify-between">
              <Text
                className={selectedPriestId ? "text-black" : "text-gray-400"}
              >
                {getPriestName(selectedPriestId)}
              </Text>
              <Image
                source={require("@/assets/icons/arrow-up-down.png")}
                style={{ width: 20, height: 20, tintColor: gray_400 }}
              />
            </View>
          </Pressable>
          {errors.priestId && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.priestId.message}
            </Text>
          )}
        </View>

        {/* ═══ Modal: Sacerdote ═══ */}
        <Modal
          visible={showPriestPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPriestPicker(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/50 px-6"
            onPress={() => setShowPriestPicker(false)}
          >
            <Pressable
              className="max-h-96 rounded-xl bg-white p-4"
              onPress={() => {}}
            >
              <Text className="mb-4 text-lg font-bold">
                Seleccionar sacerdote
              </Text>
              {priests.length === 0 ? (
                <Text className="py-4 text-center text-gray-400">
                  No hay sacerdotes disponibles
                </Text>
              ) : (
                <FlatList
                  data={priests}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setValue("priestId", item.id);
                        setShowPriestPicker(false);
                      }}
                      className={`rounded-lg px-4 py-3 ${
                        selectedPriestId === item.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <Text
                        className={
                          selectedPriestId === item.id
                            ? "font-medium text-blue-600"
                            : "text-gray-700"
                        }
                      >
                        {item.name} {item.last_name}
                      </Text>
                    </Pressable>
                  )}
                />
              )}
            </Pressable>
          </Pressable>
        </Modal>

        {/* ═══ Ministros Extraordinarios ═══ */}
        <View className="mb-4">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="font-medium">Ministros Extraordinarios</Text>
            {unselectedMinisters.length > 0 && (
              <Pressable onPress={() => setShowMinisterPicker(true)}>
                <Text className="text-blue-500">+ Agregar</Text>
              </Pressable>
            )}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {selectedMinisters.map((id) => (
              <View
                key={id}
                className="flex-row items-center rounded-full bg-blue-100 px-3 py-1"
              >
                <Text className="text-sm text-blue-800">
                  {getProfileName(id, availableMinisters)}
                </Text>
                <Pressable
                  onPress={() =>
                    setValue(
                      "ministers",
                      selectedMinisters.filter((m) => m !== id),
                    )
                  }
                  className="ml-2"
                >
                  <Text className="text-blue-800">✕</Text>
                </Pressable>
              </View>
            ))}
            {selectedMinisters.length === 0 && (
              <Text className="text-sm text-gray-400">
                {unselectedMinisters.length === 0
                  ? "No hay ministros disponibles"
                  : "Ninguno seleccionado"}
              </Text>
            )}
          </View>
        </View>

        {/* ═══ Modal: Ministros ═══ */}
        <Modal
          visible={showMinisterPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowMinisterPicker(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/50 px-6"
            onPress={() => setShowMinisterPicker(false)}
          >
            <Pressable
              className="max-h-96 rounded-xl bg-white p-4"
              onPress={() => {}}
            >
              <Text className="mb-4 text-lg font-bold">Agregar ministro</Text>
              <FlatList
                data={unselectedMinisters}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setValue("ministers", [...selectedMinisters, item.id]);
                      setShowMinisterPicker(false);
                    }}
                    className="rounded-lg px-4 py-3"
                  >
                    <Text className="text-gray-700">
                      {item.name} {item.last_name}
                    </Text>
                  </Pressable>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>

        {/* ═══ Monaguillos ═══ */}
        <View className="mb-4">
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="font-medium">Monaguillos</Text>
            {unselectedAltarBoys.length > 0 && (
              <Pressable onPress={() => setShowAltarBoyPicker(true)}>
                <Text className="text-blue-500">+ Agregar</Text>
              </Pressable>
            )}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {selectedAltarBoysWatched.map((id) => (
              <View
                key={id}
                className="flex-row items-center rounded-full bg-green-100 px-3 py-1"
              >
                <Text className="text-sm text-green-800">
                  {getProfileName(id, availableAltarBoys)}
                </Text>
                <Pressable
                  onPress={() =>
                    setValue(
                      "altarBoys",
                      selectedAltarBoysWatched.filter((a) => a !== id),
                    )
                  }
                  className="ml-2"
                >
                  <Text className="text-green-800">✕</Text>
                </Pressable>
              </View>
            ))}
            {selectedAltarBoysWatched.length === 0 && (
              <Text className="text-sm text-gray-400">
                {unselectedAltarBoys.length === 0
                  ? "No hay monaguillos disponibles"
                  : "Ninguno seleccionado"}
              </Text>
            )}
          </View>
        </View>

        {/* ═══ Modal: Monaguillos ═══ */}
        <Modal
          visible={showAltarBoyPicker}
          transparent
          animationType="fade"
          onRequestClose={() => setShowAltarBoyPicker(false)}
        >
          <Pressable
            className="flex-1 justify-center bg-black/50 px-6"
            onPress={() => setShowAltarBoyPicker(false)}
          >
            <Pressable
              className="max-h-96 rounded-xl bg-white p-4"
              onPress={() => {}}
            >
              <Text className="mb-4 text-lg font-bold">Agregar monaguillo</Text>
              <FlatList
                data={unselectedAltarBoys}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setValue("altarBoys", [
                        ...selectedAltarBoysWatched,
                        item.id,
                      ]);
                      setShowAltarBoyPicker(false);
                    }}
                    className="rounded-lg px-4 py-3"
                  >
                    <Text className="text-gray-700">
                      {item.name} {item.last_name}
                    </Text>
                  </Pressable>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>

        {/* ═══ Errors ═══ */}
        {Object.values(errors).map((err, i) => (
          <Text key={i} className="mb-1 text-sm text-red-500">
            {err.message}
          </Text>
        ))}
        {error && <Text className="mb-1 text-sm text-red-500">{error}</Text>}

        {/* ═══ Submit ═══ */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          className="mt-4 rounded-lg p-3"
          style={{ backgroundColor: accentColor }}
        >
          <Text className="text-center font-bold text-white">
            {loading ? "Guardando..." : "Registrar Misa"}
          </Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
};

export default MassForm;
