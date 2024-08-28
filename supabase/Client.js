import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

export async function onLogin(email, password, path, type_role) {
    // Autenticar al estudiante

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
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

export async function onRegister(email, password, path, type_role) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: type_role
            }
        }
    });

    if (error) {
        console.error('Error create:', error.message);

        return
    } 

    alert("Creado con exito")
}

export async function onSigOut() {
    const { error } = await supabase.auth.signOut()

    if (error) return console.log(error)

    alert("Session cerrada correctamente")
}

export async function onAuthChecking() {
    const { data: {session}, error } = await supabase.auth.getSession()

    if (error) {
        alert("Error al comprobar la sesion")
        return
    }

    return session
}