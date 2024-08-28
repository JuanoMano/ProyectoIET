import { createClient } from "@supabase/supabase-js"
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const Email = document.getElementById('Email').value
    const Clave = document.getElementById('Pass').value

    const { data, error } = await supabase
    .from('docente')
    .select('*')
    .eq('correo', Email)
    .eq('clave', Clave)
    .single();

    console.log(data)

    if (error) {
        alert('fofefifuafo')
    } else {
        window.location.href = '/html/estudiante.html'
    }
})