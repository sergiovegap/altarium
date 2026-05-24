// React
import { useCallback, useEffect, useState } from "react";
// Supabase
import { supabase } from "@/lib/supabase";

type Priest = { id: string; name: string; last_name: string };
type ProfileRef = { id: string; name: string; last_name: string };

type CreateMassData = {
  day: Date;
  time: Date;
  priestId: string;
  ministers: string[];
  altarBoys: string[];
};

interface UseCreateMassReturn {
  priests: Priest[];
  availableMinisters: ProfileRef[];
  availableAltarBoys: ProfileRef[];
  isLoadingData: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  handleCreateMass: (data: CreateMassData) => Promise<boolean>;
}

export const useCreateMass = (
  parishId: string | undefined,
): UseCreateMassReturn => {
  const [priests, setPriests] = useState<Priest[]>([]);
  const [availableMinisters, setAvailableMinisters] = useState<ProfileRef[]>(
    [],
  );
  const [availableAltarBoys, setAvailableAltarBoys] = useState<ProfileRef[]>(
    [],
  );
  // const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Load reference data ────────────────────────────────
  // useEffect(() => {
  //   if (!parishId) {
  //     setIsLoadingData(false);
  //     return;
  //   }

  //   const loadData = async () => {
  //     setIsLoadingData(true);

  //     const [priestsRes, ministersRes, altarBoysRes] = await Promise.all([
  //       supabase
  //         .from("priests")
  //         .select("id, name, last_name")
  //         .eq("parish_id", parishId),
  //       supabase
  //         .from("profiles")
  //         .select("id, name, last_name")
  //         .eq("role", "Ministro Extraordinario")
  //         .eq("parish_id", parishId),
  //       supabase
  //         .from("profiles")
  //         .select("id, name, last_name")
  //         .eq("role", "Monaguillo")
  //         .eq("parish_id", parishId),
  //     ]);

  //     if (priestsRes.data) setPriests(priestsRes.data);
  //     if (ministersRes.data) setAvailableMinisters(ministersRes.data);
  //     if (altarBoysRes.data) setAvailableAltarBoys(altarBoysRes.data);
  //     setIsLoadingData(false);
  //   };

  //   loadData();
  // }, [parishId]);

  useEffect(() => {
    if (!parishId) return;
    const loadData = async () => {
      const [priestsRes, ministersRes, altarBoysRes] = await Promise.all([
        supabase
          .from("priests")
          .select("id, name, last_name")
          .eq("parish_id", parishId),
        supabase
          .from("profiles")
          .select("id, name, last_name")
          .eq("role", "Ministro Extraordinario")
          .eq("parish_id", parishId),
        supabase
          .from("profiles")
          .select("id, name, last_name")
          .eq("role", "Monaguillo")
          .eq("parish_id", parishId),
      ]);
      if (priestsRes.data) setPriests(priestsRes.data);
      if (ministersRes.data) setAvailableMinisters(ministersRes.data);
      if (altarBoysRes.data) setAvailableAltarBoys(altarBoysRes.data);
    };
    loadData();
  }, [parishId]);

  // ── Create mass ────────────────────────────────────────
  const handleCreateMass = useCallback(
    async (data: CreateMassData): Promise<boolean> => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const dayStr = data.day.toISOString().split("T")[0];
        const hour = String(data.time.getHours()).padStart(2, "0");
        const minute = String(data.time.getMinutes()).padStart(2, "0");
        const timeStr = `${hour}:${minute}`;

        const { data: mass, error: massError } = await supabase
          .from("masses")
          .insert({
            day: dayStr,
            time: timeStr + ":00",
            priest_id: data.priestId,
            parish_id: parishId,
          })
          .select()
          .single();

        if (massError) throw massError;

        if (data.ministers.length > 0) {
          const { error: e } = await supabase.from("ministers_masses").insert(
            data.ministers.map((id) => ({
              mass_id: mass.id,
              minister_id: id,
            })),
          );
          if (e) throw e;
        }

        if (data.altarBoys.length > 0) {
          const { error: e } = await supabase.from("altar_boys_masses").insert(
            data.altarBoys.map((id) => ({
              mass_id: mass.id,
              altar_boy_id: id,
            })),
          );
          if (e) throw e;
        }

        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : err && typeof err === "object" && "message" in err
              ? (err as { message: string }).message
              : "Error inesperado";
        setSubmitError(message);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [parishId],
  );

  // return {
  //   priests,
  //   availableMinisters,
  //   availableAltarBoys,
  //   isLoadingData,
  //   isSubmitting,
  //   submitError,
  //   handleCreateMass,
  // };

  return {
    priests,
    availableMinisters,
    availableAltarBoys,
    isLoadingData: !!parishId && priests.length === 0,
    isSubmitting,
    submitError,
    handleCreateMass,
  };
};
