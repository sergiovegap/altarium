// React
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect, useState } from "react";
import { Text } from "react-native";
// Expo
// Supabase
import { supabase } from "@/lib/supabase";
// Custom
import ThemedView from "@/components/common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { ReligiousOrder } from "@/types";

interface Props {
  time: string;
  priest: string;
  altarBoys: string[];
  ministers: string[];
  onCancel: () => void;
  onSubmit: () => void;
}

const massForm = () => {
  const { accentColor } = useThemeColor();
  const [religiousOrders, setReligiousOrders] = useState<ReligiousOrder[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReligiousOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("religious_orders")
          .select("id, name")
          .order("name");
        if (error) throw error;
        setReligiousOrders(data || []);
        setSelectedIndex(0); // Seleccionar el primero por defecto
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error al cargar órdenes religiosas",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchReligiousOrders();
  }, []);

  if (loading) {
    return (
      <ThemedView>
        <Text className="text-center">Cargando órdenes religiosas...</Text>
      </ThemedView>
    );
  }
  if (error) {
    return (
      <ThemedView>
        <Text className="text-center text-red-500">Error: {error}</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <SegmentedControl
        values={religiousOrders.map((order) => order.name)}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        tintColor={accentColor}
        fontStyle={{ fontSize: 14 }}
        activeFontStyle={{ fontWeight: "600" }}
        style={{ margin: 16 }}
      />
      {/* Podés acceder a la orden seleccionada así: */}
      {religiousOrders[selectedIndex] && (
        <Text className="mt-4 text-center">
          Seleccionado: {religiousOrders[selectedIndex].name}
        </Text>
      )}
    </ThemedView>
  );
};

export default massForm;
