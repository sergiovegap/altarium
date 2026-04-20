import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "./useSession";
import type { Profile, UserRole } from "../../../../../packages/core/types";

export const useProfile = () => {
    const { session, loading } = useSession();
    const [profile, setProfile] = useState<Profile>();
    const [userRole, setUserRole] = useState<UserRole>();
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (session?.user.id) {
                const fetchProfile = async () => {
                    const { data, error } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();

                    if (error) {
                        console.error("Error fetching profile:", error);
                        setLoadingProfile(false);
                        return;
                    }

                    setProfile(data);
                    setUserRole(data.role);
                    setLoadingProfile(false);
                };

                fetchProfile();
            } else {
                setLoadingProfile(false);
            }
        }
    }, [session, loading]);

    return { profile, userRole, loadingProfile };
};
