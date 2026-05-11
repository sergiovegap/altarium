// React
import { useEffect, useState } from "react";
// Custom
import { supabase } from "@/lib/supabase";

export interface MassDetailData {
  id: string;
  day: string;
  time: string;
  priest: { name: string; last_name: string } | null;
  ministers: { name: string; last_name: string }[];
  altarBoys: { name: string; last_name: string }[];
}
export const useMassDetail = (massId?: string) => {
  const [mass, setMass] = useState<MassDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!massId) {
      setMass(null);
      setLoading(false);
      return;
    }
    const fetchMassDetail = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("masses")
          .select(
            `
            *,
            priest:priests!masses_priest_id_fkey(name, last_name),
            ministers_masses(minister:profiles!ministers_masses_minister_id_fkey(name, last_name)),
            altar_boys_masses(altar_boy:profiles!altar_boys_masses_altar_boy_id_fkey(name, last_name))
          `,
          )
          .eq("id", massId)
          .single();
        if (error) throw error;
        setMass({
          id: data.id,
          day: data.day,
          time: data.time,
          priest: data.priest,
          ministers:
            data.ministers_masses
              ?.map((m: any) => m.minister)
              .filter(Boolean) ?? [],
          altarBoys:
            data.altar_boys_masses
              ?.map((ab: any) => ab.altar_boy)
              .filter(Boolean) ?? [],
        });
      } catch (err) {
        console.error("Error fetching mass detail:", err);
        setMass(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMassDetail();
  }, [massId]);

  return { mass, loading };
};
