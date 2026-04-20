// React
import React, { useCallback, useState } from "react";
import { Text } from "react-native";
// Expo
import { router } from "expo-router";
// Libraries
import {
    Calendar,
    CalendarMonth,
    toDateId,
    fromDateId,
} from "@marceloterreiro/flash-calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FlashListProps } from "@shopify/flash-list";
// Custom
import ThemedView from "@/components/common/ThemedView";
import MassCard from "./[day]/[id]";
import ShadowLine from "@/components/common/ShadowLine";
import AddMassButton from "@/components/screens/masses/AddMassButton";
import CustomButton from "@/components/common/CustomButton";
import { useThemeColor } from "@/hooks/useThemeColor";

const monthDevotion = [
    { id: "1", name: "Santísimo Nombre de Jesús" },
    { id: "2", name: "Sagrada Familia" },
    { id: "3", name: "San José" },
    { id: "4", name: "Resurrección del Señor" },
    { id: "5", name: "Santísima Virgen María" },
    { id: "6", name: "Sagrado Corazón de Jesús" },
    { id: "7", name: "Preciosísima Sangre de Cristo" },
    { id: "8", name: "Inmaculado Corazón de María" },
    { id: "9", name: "Biblia" },
    { id: "10", name: "Santo Rosario" },
    { id: "11", name: "Almas del Purgatorio" },
    { id: "12", name: "Adviento y Navidad" },
];

const today = toDateId(new Date());

const Masses = () => {
    const { accentColor, gold, gold_100, gold_600 } = useThemeColor();
    const [selectedDate, setSelectedDate] = useState(today);
    const [visibleMonth, setVisibleMonth] = useState(today);

    const handleViewableItemsChanged = useCallback<
        NonNullable<FlashListProps<CalendarMonth>["onViewableItemsChanged"]>
    >(({ viewableItems }) => {
        const firstVisibleItem = viewableItems.find((item) => item.isViewable);

        if (firstVisibleItem) {
            setVisibleMonth(firstVisibleItem.item.id);
        }
    }, []);

    const getMonthDevotion = (date: Date) => {
        const monthIndex = date.getMonth();
        return monthDevotion[monthIndex].name ?? "";
    };

    return (
        <ThemedView>
            <Text className="text-3xl font-bold mb-5">
                {visibleMonth.split("-")[0]}
            </Text>
            <Calendar.List
                calendarActiveDateRanges={[
                    {
                        startId: selectedDate,
                        endId: selectedDate,
                    },
                ]}
                calendarFormatLocale="es-MX"
                getCalendarMonthFormat={(date) => {
                    const month = format(date, "MMMM", { locale: es });
                    const label =
                        month.charAt(0).toUpperCase() + month.slice(1);
                    const devotion = getMonthDevotion(date);

                    return `${label} · ${devotion}`;
                }}
                calendarInitialMonthId={selectedDate}
                calendarPastScrollRangeInMonths={1}
                calendarFutureScrollRangeInMonths={1}
                onCalendarDayPress={(day) => {
                    router.push(`/(drawer)/(tabs)/masses/${day}`);
                }}
                onViewableItemsChanged={handleViewableItemsChanged}
                theme={{
                    rowMonth: {
                        content: {
                            fontSize: 18,
                            fontWeight: "700",
                        },
                    },
                    rowWeek: {
                        container: {
                            borderBottomWidth: 1,
                            borderBottomColor: "#9ca3af",
                            borderStyle: "solid",
                        },
                    },
                    itemDay: {
                        idle: ({ isPressed, isWeekend, isToday }) => ({
                            container: {
                                borderColor: "transparent",
                                backgroundColor:
                                    isPressed || isToday ? gold_600 : undefined,
                                borderRadius: isPressed && 30,
                            },
                            content: {
                                color:
                                    isWeekend && !isPressed
                                        ? "black"
                                        : undefined,
                            },
                        }),
                        today: ({ isPressed }) => ({
                            container: {
                                borderColor: accentColor,
                                borderRadius: 30,
                                // backgroundColor: isPressed ? gold_600 : accentColor,
                            },
                            content: {
                                color: "#000000",
                            },
                        }),
                        active: ({ isEndOfRange, isStartOfRange }) => ({
                            container: {
                                backgroundColor: gold_600,
                                borderTopLeftRadius: isStartOfRange
                                    ? 4
                                    : undefined,
                                borderBottomLeftRadius: isStartOfRange
                                    ? 4
                                    : undefined,
                                borderTopRightRadius: isEndOfRange
                                    ? 4
                                    : undefined,
                                borderBottomRightRadius: isEndOfRange
                                    ? 4
                                    : undefined,
                            },
                            content: {
                                color: "#ffffff",
                            },
                        }),
                    },
                }}
            ></Calendar.List>
        </ThemedView>
    );
};

export default Masses;
