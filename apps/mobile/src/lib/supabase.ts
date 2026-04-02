import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from '@altarium/core';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: AsyncStorage,         // persiste la sesión en el dispositivo
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false      // no aplica en móvil
    }
  }
)