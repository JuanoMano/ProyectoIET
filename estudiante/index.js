import { onAuthChecking, onSignOut, supabase } from "../supabase/Client"

// onAuthChecking().then(session => {

//     if (!session) window.location.href = '../index.html'

//     if (session?.user) {
//         const { role } = session.user.user_metadata

//         if (role != "EST") {
//             window.location.href = '../index.html'
//         }
//     }
// })

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

document.getElementById('logout').addEventListener('click', () => {
    onSignOut()
})