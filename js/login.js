import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

document.getElementById('Admin').addEventListener('submit', async function(event){
    event.preventDefault()

    const Email1 = document.getElementById('Email1').value
    const Clave1 = document.getElementById('Pass1').value

    await LoginAdmin(Email1, Clave1)
})

async function LoginAdmin(Email1, Clave1) {
    // Autenticar al admin
    const { user, error } = await supabase.auth.signInWithPassword({
        email: Email1,
        password: Clave1,
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

document.getElementById('Docente').addEventListener('submit', async function(event){
    event.preventDefault()

    const Email2 = document.getElementById('Email2').value
    const Clave2 = document.getElementById('Pass2').value

    await LoginDocente(Email2, Clave2)
})

async function LoginDocente(Email2, Clave2) {
    // Autenticar al docente
    const { user, error } = await supabase.auth.signInWithPassword({
        email: Email2,
        password: Clave2,
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

document.getElementById('Estudiante').addEventListener('submit', async function(event){
    event.preventDefault()

    const Email3 = document.getElementById('Email3').value
    const Clave3 = document.getElementById('Pass3').value

    await LoginEstudiante(Email3, Clave3)
})

async function LoginEstudiante(Email3, Clave3) {
    // Autenticar al estudiante
    const { user, error } = await supabase.auth.signInWithPassword({
        email: Email3,
        password: Clave3,
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

