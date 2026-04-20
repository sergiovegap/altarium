import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useSession = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtiene la sesión actual
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Escucha cambios de sesión
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) =>
            setSession(session),
        );

        return () => subscription.unsubscribe();
    }, []);

    return { session, loading };
};
