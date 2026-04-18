// React
import React, { useEffect } from "react";
import { Text, View } from "react-native";
// Expo
import { useLocalSearchParams, useNavigation } from "expo-router";
// Third-party libraries
import { supabase } from "@/lib/supabase";
// Custom
import ThemedView from "@/components/common/ThemedView";
import Avatar from "@/components/common/Avatar";

const AltarBoyInfo = () => {
    const { id, name, profilePhoto, liturgical_items } = useLocalSearchParams();
    const navigation = useNavigation();

    // Set title
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    useEffect(() => {
        const fetchDetalle = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", id)
                .single();
        };
        fetchDetalle();
    }, [id]);

    return (
        <ThemedView className="m-5 gap-10">
            <Avatar
                userName={name.toString()}
                imageSource={require("@/assets/images/development/boy-1.png")}
            />
            <View>
                <Text className="font-bold">Elementos litúrgicos:</Text>
                <Text className="text-gray-800">{liturgical_items}</Text>
            </View>
        </ThemedView>
    );
};

export default AltarBoyInfo;
