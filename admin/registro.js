import { onRegister, onAuthChecking } from "../supabase/Client"

// captura datos para registrar un estudiante

document.getElementById('regEst').addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = document.getElementById('name').value
    const grade = document.getElementById('grade').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    onRegister(email, password, "EST", name, grade)

    onAuthChecking().then(session => {

        console.log(session)

    })

})