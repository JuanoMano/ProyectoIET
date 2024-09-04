import { onRegister } from "../supabase/Client"

// captura datos para registrar un estudiante

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    onRegister(email, password, "EST")
})