import { onLogin } from '../supabase/Client'

document.getElementById('Admin').addEventListener('submit', async function(event){
    event.preventDefault()

    const Email = document.getElementById('Email1').value
    const Clave = document.getElementById('Pass1').value

    onLogin(Email, Clave, "./prueba.html")
})

document.getElementById('Docente').addEventListener('submit', function(event){
    event.preventDefault()

    const Email = document.getElementById('Email2').value
    const Clave = document.getElementById('Pass2').value

    onLogin(Email, Clave, "./prueba.html")
})

document.getElementById('Estudiante').addEventListener('submit', function(event){
    event.preventDefault()

    const Email = document.getElementById('Email3').value
    const Clave = document.getElementById('Pass3').value

    onLogin(Email, Clave, "./html/estudiante.html", "EST")
})