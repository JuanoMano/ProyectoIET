import { onAuthChecking, onSignOut } from "../supabase/Client"

onAuthChecking().then(session => {

    console.log(session)

    if (!session) window.location.href = '../index.html'

    if (session?.user) {
        const { role } = session.user.user_metadata

        if (role != "DOC") {
            window.location.href = '../index.html'
        }
    }
})

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

document.getElementById('btn_logout').addEventListener('click', () => {
    onSignOut()
})