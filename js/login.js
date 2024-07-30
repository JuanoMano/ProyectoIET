import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

document.getElementById('Docente').addEventListener('submit', async function(event){
    event.preventDefault()

    const Email = document.getElementById('Email').value
    const Clave = document.getElementById('Pass').value

    await LoginDocente(Email, Clave)
})

async function LoginDocente(Email, Clave) {
    // Autenticar al docente
    const { user, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: Clave,
    });

    if (error) {
        console.error('Error signing in:', error.message);
        alert('Invalid credentials');
    } else {
        console.log('User signed in:', user);
        alert('Successfully signed in');
        window.location.href='/prueba.html';
        // Redireccionar o hacer alguna acción  después de iniciar sesión
    }
}

