import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

export async function onLogin(Email, Clave, path, type_role) {
    // Autenticar al estudiante

    const { data, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: Clave,
    });

    if (error) {
        console.error('Error signing in:', error.message);
        alert('Error al iniciar sesion');

        return
    } 
    
    const { role } = data.user.user_metadata

    if (role == type_role) {    
        window.location.href = path
    } else {
        alert("Rol incorrecto")
    }
}