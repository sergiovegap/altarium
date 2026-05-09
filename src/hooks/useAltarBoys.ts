// React
import { useEffect, useState } from "react";
// Custom
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

export const useAltarBoys = (parishId?: string) => {
  const [altarBoys, setAltarBoys] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!parishId) {
      setAltarBoys([]);
      setLoading(false);
      return;
    }
    const fetchAltarBoys = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "Monaguillo")
          .eq("parish_id", parishId);
        if (error) throw error;
        setAltarBoys(data || []);
      } catch (err) {
        console.error("Error fetching altar boys:", err);
        setAltarBoys([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAltarBoys();
  }, [parishId]);
  return { altarBoys, loading };
};
