import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

//autenticar credenciales para loguearse

export async function onLogin(email, password, path, type_role) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing in:', error.message);
        alert('Error al iniciar sesion');

        return
    } 
    
    const { role, depend } = data.user.user_metadata

    if (role == type_role) {    

        if (depend == "Biblioteca") {
            path = "/docente/biblioteca/home.html";
        } else if (depend == "Cartelera") {
            path = "/docente/cartelera/fofef.html";
        } else {
            path = "/docente/pruebas/prueba.html";  
        }

        window.location.href = path;
    } else {
        alert("Rol incorrecto")
    }

}

//registro de un estudiante

export async function onRegister(email, password, type_role, name, grade, depend) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                role: type_role,
                name: name,
                grade: grade,
                depend: depend
            }
        }
    });

    if (error) {
        console.error('Error al registrar un estudiante:', error.message);

        return
    } 

    alert("Usuario registrado con exito")
}

//registro de un docente

export async function onRegDoc(email, password, type_role, name, depend) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                role: type_role,
                name: name,
                depend: depend
            }
        }
    });

    if (error) {
        console.error('Error al registrar docente:', error.message);

        return
    } 

    alert("Usuario registrado con exito")
}

//cerrar sesion

export async function onSignOut() {
    const { error } = await supabase.auth.signOut()

    if (error) return console.log(error)

    alert("Sesion cerrada correctamente")
}

//comprueba si existe una sesion y la entrega

export async function onAuthChecking() {
    const { data: {session}, error } = await supabase.auth.getSession()

    if (error) {
        alert("Error al comprobar la sesion")
        return
    }

    return session
}