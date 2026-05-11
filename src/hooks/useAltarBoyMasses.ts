// React
import { useEffect, useState } from "react";
// Custom
import { supabase } from "@/lib/supabase";
import type { Mass } from "@/types";

export const useAltarBoyMasses = (id: string) => {
  const [masses, setMasses] = useState<Mass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setMasses([]);
      setLoading(false);
      return;
    }

    const fetchMasses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("altar_boys_masses")
          .select("mass:masses!altar_boys_masses_mass_id_fkey(*)")
          .eq("altar_boy_id", id);

        if (error) throw error;

        setMasses(data?.map((item: any) => item.mass).filter(Boolean) || []);
      } catch (err) {
        console.error("Error fetching altar boy masses:", err);
        setMasses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMasses();
  }, [id]);

  return { masses, loading };
};
