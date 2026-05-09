// React
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
// Expo
import { useLocalSearchParams, useNavigation } from "expo-router";
// Third-party libraries

// Custom
import Avatar from "@/components/common/Avatar";
import ThemedView from "@/components/common/ThemedView";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

const AltarBoyInfo = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (!data) return;

        setProfile(data);
        navigation.setOptions({
          title: `${data.name} ${data.last_name}`,
        });

        const { data: itemsData } = await supabase
          .from("altar_boy_items")
          .select("item:liturgical_items(name)")
          .eq("altar_boy_id", id);

        if (itemsData) {
          setItems(itemsData.map((i: any) => i.item?.name).filter(Boolean));
        }
      } catch (err) {
        console.error("Error fetching altar boy: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator />
        <Text className="text-gray-500">Cargando...</Text>
      </ThemedView>
    );
  }

  if (!profile) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Monaguillo no encontrado</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="m-5 gap-6">
      <Avatar
        userName={`${profile.name} ${profile.last_name}`}
        imageSource={profile.photo ? { uri: profile.photo } : undefined}
      />
      <View>
        <Text className="mb-1 font-bold text-gray-700">Email</Text>
        <Text className="text-gray-500">{profile.email}</Text>
      </View>
      {profile.birthday && (
        <View>
          <Text className="mb-1 font-bold text-gray-700">Cumpleaños</Text>
          <Text className="text-gray-500">
            {profile.birthday.split("-").reverse().join("-")}
          </Text>
        </View>
      )}
      {items.length > 0 && (
        <View>
          <Text className="mb-1 font-bold text-gray-700">
            Elementos litúrgicos
          </Text>
          <Text className="text-gray-500">{items.join(", ")}</Text>
        </View>
      )}
    </ThemedView>
  );
};
export default AltarBoyInfo;
