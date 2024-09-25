import { onLogin, onAuthChecking } from '../supabase/Client'

//captura de datos admin

document.getElementById('Admin').addEventListener('submit', function (event) {
    event.preventDefault()

    const email = document.getElementById('Email1').value
    const password = document.getElementById('Pass1').value

    onLogin(email, password, "/admin/admin.html", "ADM")
})

//captura de datos docente

document.getElementById('Docente').addEventListener('submit', function (event) {
    event.preventDefault()

    const email = document.getElementById('Email2').value
    const password = document.getElementById('Pass2').value

    onLogin(email, password, "/docente/biblioteca/home.html", "DOC")

})

//captura de datos de estudiante

document.getElementById('Estudiante').addEventListener('submit', function (event) {
    event.preventDefault()
    
    const email = document.getElementById('Email3').value
    const password = document.getElementById('Pass3').value
 
    onLogin(email, password, path, "EST")

})