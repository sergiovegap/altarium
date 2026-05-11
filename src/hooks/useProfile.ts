// React
import { useEffect, useState } from "react";
// Custom
import { supabase } from "@/lib/supabase";
import type { Parish, Profile, UserRole } from "@/types";
import { useSession } from "../features/auth/useSession";

export const useProfile = () => {
  const { session, loading } = useSession();
  const [profile, setProfile] = useState<Profile>();
  const [userRole, setUserRole] = useState<UserRole>();
  const [parishName, setParishName] = useState<Parish["name"]>();
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (session?.user.id) {
        const fetchProfile = async () => {
          const { data, error } = await supabase
            .from("profiles")
            .select("*, parish:parishes!profiles_parish_id_fkey(name)")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error al cargar perfil: ", error);
            setLoadingProfile(false);
            return;
          }

          setProfile(data);
          setUserRole(data.role);
          setParishName(data.parish?.name);
          setLoadingProfile(false);
        };

        fetchProfile();
      }
    }
  }, [session, loading]);

  return { profile, userRole, parishName, loadingProfile };
};
