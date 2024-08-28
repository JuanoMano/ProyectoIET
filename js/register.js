import { onRegister } from "../supabase/Client";

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const email =  document.getElementById('email').value
    const password = document.getElementById('password').value

    onRegister(email, password, "", "EST")
})