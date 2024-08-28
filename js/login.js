import { onAuthChecking, onLogin, supabase } from '../supabase/Client'

onAuthChecking().then(session => {
    if (session?.user) {
        const { role } = session.user.user_metadata

        if (role == "ADM") {
            window.location.href = './admin.html'
        }

        if (role == "DOC") {
            window.location.href = './docente.html'
        }

        if (role == "EST") {
            window.location.href = './estudiante.html'
        }
    }
})

document.getElementById('Admin').addEventListener('submit', function (event) {
    event.preventDefault()

    const Email = document.getElementById('Email1').value
    const Clave = document.getElementById('Pass1').value

    onLogin(Email, Clave, "/admin.html", "ADM")
})

document.getElementById('Docente').addEventListener('submit', function (event) {
    event.preventDefault()

    const Email = document.getElementById('Email2').value
    const Clave = document.getElementById('Pass2').value

    onLogin(Email, Clave, "/docente.html", "DOC")
})

document.getElementById('Estudiante').addEventListener('submit', function (event) {
    event.preventDefault()

    const Email = document.getElementById('Email3').value
    const Clave = document.getElementById('Pass3').value

    onLogin(Email, Clave, "/estudiante.html", "EST")
})

// document.getElementById("test").addEventListener('click', () => onRegister("pruebaDoce@gmail.com", '123456', "", "DOC"))

