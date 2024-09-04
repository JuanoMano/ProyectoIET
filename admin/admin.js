import { onRegDoc } from '../supabase/Client'

//lo que esta abajo de esto es para crear nuevos usuarios ya sea docente o admin, asi es mas facil, rapido y manual.
document.getElementById("create").addEventListener('click', () => 
    onRegDoc("prueba@gmail.com", "123456", "DOC", "juan", "Huerta"))
