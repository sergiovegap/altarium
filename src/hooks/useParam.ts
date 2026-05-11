import { useLocalSearchParams } from "expo-router";

export const useParam = (key: string): string | undefined => {
  const params = useLocalSearchParams();
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};
