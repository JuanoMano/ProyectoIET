import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

document.getElementById('form').addEventListener('submit', async function(event){
    event.preventDefault()

    const email = document.getElementById('Email').value
    const password = document.getElementById('Pass').value

    try {
        // Llama a Supabase para crear un nuevo usuario
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    role: 'EST',
                }
            }
        });

        if (error) {
            throw error
        }

        // Si no hubo errores, muestra un mensaje de éxito
        alert('Usuario registrado con éxito');
    } catch (error) {
        // Si hubo un error, muestra un mensaje de error
        alert('Error registrando usuario: ' + error.message)
    }
})
