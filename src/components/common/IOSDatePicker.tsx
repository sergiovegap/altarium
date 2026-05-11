// React
import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
// Third-party libraries
import { DatePickerComponent } from "@expo/ui/swift-ui";
import { DatePickerStyleType } from "@expo/ui/swift-ui/modifiers";

interface IOSDatePickerProps {
  pickerMode: "date" | "time";
  selectedDay: Date;
  selectedTime: Date;
  onChange: (field: "day" | "time", date: Date) => void;
  onClose: () => void;
  visible: boolean;
}
interface PickerModule {
  DatePicker: React.ComponentType<{
    modifiers: Array<{ style: DatePickerStyleType }>;
    selection: Date;
    displayedComponents: DatePickerComponent[];
    onDateChange: (date: Date) => void;
  }>;
  Host: React.ComponentType<{
    matchContents: boolean;
    children: React.ReactNode;
  }>;
  datePickerStyle: (style: DatePickerStyleType) => {
    style: DatePickerStyleType;
  };
}
export const IOSDatePicker = ({
  pickerMode,
  selectedDay,
  selectedTime,
  onChange,
  onClose,
  visible,
}: IOSDatePickerProps) => {
  const [mod, setMod] = useState<PickerModule | null>(null);

  useEffect(() => {
    Promise.all([
      import("@expo/ui/swift-ui") as unknown as Promise<{
        DatePicker: PickerModule["DatePicker"];
        Host: PickerModule["Host"];
      }>,
      import("@expo/ui/swift-ui/modifiers") as unknown as Promise<{
        datePickerStyle: PickerModule["datePickerStyle"];
      }>,
    ]).then(([{ DatePicker, Host }, { datePickerStyle }]) =>
      setMod({ DatePicker, Host, datePickerStyle }),
    );
  }, []);

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center bg-black/40"
        style={{ borderRadius: 20, padding: 20 }}
        onPress={onClose}
      >
        <Pressable
          className="rounded-xl bg-white px-5 pb-10 pt-5"
          onPress={() => {}}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold">
              {pickerMode === "date" ? "Seleccionar fecha" : "Seleccionar hora"}
            </Text>
            <Pressable onPress={onClose}>
              <Text className="text-base font-semibold text-blue-500">
                Listo
              </Text>
            </Pressable>
          </View>
          {mod ? (
            <mod.Host matchContents>
              {pickerMode === "date" ? (
                <mod.DatePicker
                  modifiers={[mod.datePickerStyle("graphical")]}
                  selection={selectedDay}
                  displayedComponents={["date"]}
                  onDateChange={(date) => onChange("day", date)}
                />
              ) : (
                <mod.DatePicker
                  modifiers={[mod.datePickerStyle("wheel")]}
                  selection={selectedTime}
                  displayedComponents={["hourAndMinute"]}
                  onDateChange={(date) => onChange("time", date)}
                />
              )}
            </mod.Host>
          ) : (
            <ActivityIndicator />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};
