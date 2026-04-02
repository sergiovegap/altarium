import { supabase } from '@/packages/core/lib/supabase/supabase'
import type { SignUpForm, SignInForm } from './types'

export const signUp = async (form: SignUpForm) => {
   try {
      // 1. Crea el usuario en auth.users
      const { data, error } = await supabase.auth.signUp({
         email: form.email,
         password: form.password
      });

      if (error || !data.user) {
         return 
      }

      // 2. Crea el perfil en public.profiles
      const { error: profileError } = await supabase
         .from('profiles')
         .insert({
            id: data.user.id,
            email: form.email,
            name: form.name,
            last_name: form.lastName,
            birthday: form.birthday?.toISOString(),
            role: form.role,
            parish_id: form.parishId
         });

   if (profileError) return { error: profileError }
      
      return { user: data.user }
   } catch (error) {
      console.log(error)
      throw `Error: ${error}`;
   }
}

export const signIn = async (form: SignInForm) => {
  try {
   const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password
  })

  return { session: data.session }
  } catch (error) {
     throw `Error: ${error}`;
  }
}

export const signOut = async () => {
   const { error } = await supabase.auth.signOut();
  return { error }
}

export const resetPassword = async (email: string) => {
   const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error }
}