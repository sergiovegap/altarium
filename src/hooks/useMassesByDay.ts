// React
import { useEffect, useState } from "react";
// Supabase
import { supabase } from "@/utils/supabase/supabase";

interface MassDetails {
  id: string;
  time: string;
  priest: string;
  ministers: string[];
  altarBoys: string[];
}

export const useMassesByDay = (dayParam: string | string[] | undefined) => {
  const [masses, setMasses] = useState<MassDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard clause - verificar parámetro válido
    if (!dayParam || Array.isArray(dayParam)) {
      setMasses([]);
      setLoading(false);
      return;
    }
    // Capturar el valor en una variable local para evitar problemas de ámbito
    const selectedDay = dayParam;

    const fetchMasses = async () => {
      try {
        setLoading(true);
        // Debug: ver qué día se está consultando
        console.log("Fetching masses for day: ", selectedDay);

        // 1. Obtener misas del día
        // Nota: selectedDay debe estar en formato "YYYY-MM-DD" para que PostgreSQL lo convierta a DATE
        const { data, error } = await supabase
          .from("masses")
          .select(
            `
            id,
            time,
            priest:priests!masses_priest_id_fkey ( name )
          `,
          )
          .eq("day", selectedDay); // selectedDay es string "YYYY-MM-DD"

        if (error) {
          console.error("Supabase error: ", error);
          setMasses([]);
          return;
        }

        if (!data || data.length === 0) {
          console.log("No masses found for day: ", selectedDay);
          setMasses([]);
          return;
        }

        console.log("Masses found: ", data.length);

        // 2. Para cada misa, obtener monaguillos y ministros
        const massesWithDetails: MassDetails[] = await Promise.all(
          data.map(async (mass: any) => {
            // Ministros
            const { data: ministersData, error: ministersError } =
              await supabase
                .from("ministers_masses")
                .select(
                  `
                minister:profiles!ministers_masses_minister_id_fkey ( name )
              `,
                )
                .eq("mass_id", mass.id);
            if (ministersError) {
              console.error("Error fetching ministers: ", ministersError);
            }

            // Monaguillos
            const { data: altarBoysData, error: altarBoysError } =
              await supabase
                .from("altar_boys_masses")
                .select(
                  `
                altar_boy:profiles!altar_boys_masses_altar_boy_id_fkey ( name )
              `,
                )
                .eq("mass_id", mass.id);
            if (altarBoysError) {
              console.error("Error fetching altar boys: ", altarBoysError);
            }

            return {
              id: mass.id,
              time: mass.time, // TIME viene como "HH:MM:SS"
              priest: mass.priest?.name || "Sin sacerdote",
              ministers:
                ministersData
                  ?.map((m: any) => m.minister?.name)
                  .filter(Boolean) || [],
              altarBoys:
                altarBoysData
                  ?.map((ab: any) => ab.altar_boy?.name)
                  .filter(Boolean) || [],
            };
          }),
        );
        setMasses(massesWithDetails);
      } catch (err) {
        console.error("Unexpected error fetching masses: ", err);
        setMasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMasses();
  }, [dayParam]); // ← Usar dayParam, no day
  return { masses, loading };
};
