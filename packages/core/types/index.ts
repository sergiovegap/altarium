import type { Database } from './database.types';

// Tipos de conveniencia
export type Parish = Database['public']['Tables']['parishes']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Priest = Database['public']['Tables']['priests']['Row'];
export type Mass = Database['public']['Tables']['masses']['Row'];
export type LiturgyItem = Database['public']['Tables']['liturgical_items']['Row'];
export type AltarBoyItem = Database['public']['Tables']['altar_boy_items']['Row'];
export type MassItem = Database['public']['Tables']['mass_items']['Row'];
export type ReligiousOrder = Database['public']['Tables']['religious_orders']['Row'];

// Enum
export type UserRole = Database['public']['Enums']['user_role_type'];

// MUY IMPORTANTE: re-exporta Database
export type { Database };