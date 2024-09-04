import { onAuthChecking, onSignOut } from "../supabase/Client"

onAuthChecking().then(session => {

    console.log(session)

    if (!session) window.location.href = '../index.html'

    if (session?.user) {
        const { role } = session.user.user_metadata

        if (role != "ADM") {
            window.location.href = '../index.html'
        }
    }
})

// solo quedese que ayuda a que funcione correctamente el cerrar sesion

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        // clear local and session storage
        [window.localStorage, window.sessionStorage].forEach((storage) => {
            Object.entries(storage)
                .forEach(([key]) => {
                    storage.removeItem(key)
                })
        })

        window.location.href = '../index.html'
    }
})

// cuando haga click al boton cerrar sesion llama la funcion onSingOut que es para eso mismo xd.

document.getElementById('btn_logout').addEventListener('click', () => {
    onSignOut()
})