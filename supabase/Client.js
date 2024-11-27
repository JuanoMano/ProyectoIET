import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_ANON_KEY)

// autentica credenciales y logeo

export async function onLogin(email, password, path) {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error('Error signing in:', error.message);
        alert('Error al iniciar sesion');

        return
    } 
    
    const { role, depend } = data.user.user_metadata
    
    if (role == "DOC") {

        if (depend == "Biblioteca") {
            path = "/docente/biblioteca/home.html";
        } else if (depend == "Cartelera") {
            path = "/docente/cartelera/fofef.html";
        } else {
            path = "/html/prueba.html"; 
        }

        window.location.href = path

    } else if (role == "EST") {

        if (depend == "Biblioteca") {
            path = "/estudiante/biblioteca/home.html";
        } else if (depend == "Cartelera") {
            path = "/estudiante/cartelera/home.html";
        } else {
            path = "/html/prueba.html";  
        }

        window.location.href = path

    } else {
        alert("Rol incorrecto")
    }

}

//registro de un estudiante

export async function onRegister(email, password, type_role, name, grade, depend) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                role: type_role,
                name: name,
                grade: grade,
                depend: depend
            }
        }
    });

    if (error) {
        console.error('Error al registrar un estudiante:', error.message);

        return
    } 

    alert("Usuario registrado con exito")
}

//registro de un docente

export async function onRegDoc(email, password, type_role, name, depend) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                role: type_role,
                name: name,
                depend: depend
            }
        }
    });

    if (error) {
        console.error('Error al registrar docente:', error.message);

        return
    } 

    alert("Usuario registrado con exito")
}

//cerrar sesion

export async function onSignOut() {
    const { error } = await supabase.auth.signOut()

    if (error) return console.log(error)

    alert("Sesion cerrada correctamente")
}

//comprueba si existe una sesion y la entrega

let depend

export async function onAuthChecking() {
    const { data: {session}, error } = await supabase.auth.getSession()

        depend = session.user.user_metadata.depend
 
    if (error) {
        alert("Error al comprobar la sesion")
        return
    }

    return session
}

// CREAR actividades globales

export async function insertGlobalA(actName, details, cantI, cantH, fecha, createBy){

    const { error } = await supabase
  .from('actGlobal')
  .insert({ name: actName,
    cantI: cantI, 
    cantH: cantH, 
    fecha: fecha, 
    createBy: createBy, 
    details: details ,
    createBy: createBy
    })

  if (error) {
    console.error('Error al insertar datos:', error);
    alert('Error al insertar datos: ' + error.message);  // Mostrar el error en la página
    } else {
    console.log('Datos insertados correctamente');
    }

}

//OBTENER actividades globales

export async function getActG() {
    const { data, error } = await supabase
    .from('actGlobal')
    .select('*')

    if(error){
        console.error("error al obtener las actividades globales: ", error)
        return[]
    }

    if (data.length > 0) {
        console.log("Actividades globales encontradas:", data);
    } else {
        console.log("No se encontraron actividades globales");
    }
    return data
}

//MOSTRAR actividades globales

export async function displayActG() {
    
    const activities = await getActG()

    if (!activities || activities.length === 0) {
        console.log("No hay actividades para procesar.");
        return;
    }

    const activitiesList = document.getElementById('activity-list');

    // Iterar sobre cada actividad y agregarla al HTML
    activities.forEach(activity => {
        const detailsId = `activity-${activity.id}`;  // Añadir prefijo al ID

        const li = document.createElement('li');
        li.classList.add('not-completed');

        li.innerHTML = `
                <p>${activity.name}</p>
                <i class='bx bx-hide toggle-details' data-details-id="${detailsId}"></i>
                <div class="activity-details" id="${detailsId}" style="display: none;">
                    <p>Detalles: ${activity.details}</p>
                    <p>Integrantes: ${activity.cantI}</p>
                    <p>Horas: ${activity.cantH}</p>
                    <p>Fecha Límite: ${activity.fecha}</p>
                </div>
            `;

        activitiesList.appendChild(li);

        const toggleDetails = li.querySelector(`.toggle-details`);
        const detailsDiv = li.querySelector(`#${detailsId}`);
        
        toggleDetails.addEventListener('click', () => {
            if (detailsDiv.style.display === 'none') {
                detailsDiv.style.display = 'block';
                toggleDetails.classList.replace('bx-hide', 'bx-show');
            } else {
                detailsDiv.style.display = 'none';
                toggleDetails.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

}

//INSERT actividades en la dependencia

export async function insertActD(actName, details, cantI, cantH, fecha) {

    let depend

    await onAuthChecking().then(session => {
        depend = session.user.user_metadata.depend
    })

    const { error } = await supabase
    .from('actDepend')
    .insert({
        name: actName,
        details: details,
        cantI: cantI,
        cantH: cantH,
        fecha: fecha,
        typeD: depend
    })

    if (error) {
        console.error('Error al insertar datos:', error);
        alert('Error al insertar datos: ' + error.message);  // Mostrar el error en la página
    } else {
        console.log('Datos insertados correctamente');
    }
    
}

//OBTENER actividades segun la dependencia

export async function getAct() {

    let depend

    await onAuthChecking().then(session => {
        depend = session.user.user_metadata.depend
    })

    try {
        // Consulta a Supabase para obtener las filas donde 'typeD' coincida con 'depend'
        const { data, error } = await supabase
            .from('actDepend')  // Reemplaza con el nombre de tu tabla si es diferente
            .select('*')  // Selecciona todas las columnas
            .eq('typeD', depend);  // Filtro: Solo filas donde typeD = depend

        if (error) {
            console.error("Error al obtener actividades:", error);
            return [];
        }

        // Verifica si se obtuvieron actividades
        if (data.length > 0) {
            console.log("Actividades encontradas:", data);
        } else {
            console.log("No se encontraron actividades para la dependencia:", depend);
        }

        // Retorna las actividades obtenidas (si se necesitan en otra parte del código)
        return data;

    } catch (error) {
        console.error("Ocurrió un error inesperado:", error);
    }
}

//MOSTRAR las actividades segun la dependencia

export async function displayAct() {

    const activities = await getAct()

    if (!activities || activities.length === 0) {
        console.log("No hay actividades para procesar.");
        return;
    }

    const activitiesList = document.getElementById('activity-list')

    // Iterar sobre cada actividad y agregarla al HTML
    activities.forEach(activity => {
        const detailsId = `activity-${activity.id}`;  // Añadir prefijo al ID

        const li = document.createElement('li');
        li.classList.add('not-completed');

        li.innerHTML = `
            <p>${activity.name}</p>
            <i class='bx bx-hide toggle-details' data-details-id="${detailsId}"></i>
            <div class="activity-details" id="${detailsId}" style="display: none;">
                <p>Detalles: ${activity.details}</p>
                <p>Integrantes: ${activity.cantI}</p>
                <p>Horas: ${activity.cantH}</p>
                <p>Fecha Límite: ${activity.fecha}</p>
            </div>
        `;

        activitiesList.appendChild(li);

        const toggleDetails = li.querySelector(`.toggle-details`);
        const detailsDiv = li.querySelector(`#${detailsId}`);
        
        toggleDetails.addEventListener('click', () => {
            if (detailsDiv.style.display === 'none') {
                detailsDiv.style.display = 'block';
                toggleDetails.classList.replace('bx-hide', 'bx-show');
            } else {
                detailsDiv.style.display = 'none';
                toggleDetails.classList.replace('bx-show', 'bx-hide');
            }
        });
    });
    
}

// AGREGAR estudiantes a la base de datos

export async function insertEst(name, grade) {

    let depend

    await onAuthChecking().then(session => {
        depend = session.user.user_metadata.depend
    })

    const { error, data } = await supabase
    .from('estList')
    .insert({
        name: name,
        grade: grade,
        hours: '0',
        typeD: depend
    })

    if (error) {
        console.error('Error al insertar datos:', error);
        alert('Error al insertar datos: ' + error.message);  // Mostrar el error en la página
    } else {
        console.log('Datos insertados correctamente');
    }

}

//OBTENER estudiantes segun la dependencia

export async function getEst() {

    let depend

    await onAuthChecking().then(session => {
        depend = session.user.user_metadata.depend
    })

    const { error, data } = await supabase
    .from('estList')
    .select('*')
    .eq('typeD', depend)

    if (error) {
        console.error("Error al obtener estudiantes:", error);
        return [];
    }

    // Verifica si se obtuvieron estudiantes
    if (data.length > 0) {
        console.log("Estudiantes encontrados:", data);
    } else {
        console.log("No se encontraron estudiantes para la dependencia:", depend);
    }

    // Retorna las actividades obtenidas (si se necesitan en otra parte del código)
    return data;
}

//MOSTRAR mi perfil si soy estudiante

export async function displayMe(params) {
    
}