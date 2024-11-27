import { onAuthChecking, insertGlobalA, displayActG} from "../../supabase/Client";

//SCRIPS PARA LAS ACTIVIDADES GLOBALES

displayActG()

// Abrir el modal al hacer clic en "bx-upload"
document.getElementById('open-modal').addEventListener('click', function() {
    const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
    activityModal.show();
});

// Manejar el envío del formulario para agregar la actividad
document.getElementById('activityForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const activityName = document.getElementById('activityName').value;
    const details = document.getElementById('activityDetails').value
    const numMembers = document.getElementById('numMembers').value;
    const hours = document.getElementById('hours').value;
    const dueDate = document.getElementById('dueDate').value;
    let name

	await onAuthChecking().then(session => {
	    name = session.user.user_metadata.name
	})

    //llamar a la funcion para subir los datos de la actividad a la base de datos.
    await insertGlobalA(activityName, details, numMembers, hours, dueDate, name)

    // Generar un ID único para los detalles
    const detailsId = 'details-' + Math.floor(Math.random() * 1000);

    // Crear una nueva actividad con el ícono de ojo
    const newActivity = `
        <li class="not-completed">
            <p>${activityName}</p>
            <i class='bx bx-hide toggle-details' data-details-id="${detailsId}"></i>
            <div class="activity-details" id="${detailsId}" style="display: none;">
				<p>Docente: ${name}</p> 
                <p>Detalles: ${details}</p>
                <p>Integrantes: ${numMembers}</p>
                <p>Horas: ${hours}</p>
                <p>Fecha Límite: ${dueDate}</p>
            </div>
        </li>
    `;
    
    // Agregar la nueva actividad a la lista
    document.getElementById('activity-list').insertAdjacentHTML('beforeend', newActivity);

    // Volver a agregar los listeners para mostrar/ocultar detalles
    addToggleDetailsListeners();

    // Cerrar el modal
    const activityModal = bootstrap.Modal.getInstance(document.getElementById('activityModal'));
    activityModal.hide();

});

// Función para agregar listeners a los íconos de ojo
function addToggleDetailsListeners() {
    document.querySelectorAll('.toggle-details').forEach(function(eyeIcon) {
        eyeIcon.addEventListener('click', function() {
            const detailsId = this.getAttribute('data-details-id');
            const detailsElement = document.getElementById(detailsId);

            // Alternar la visibilidad de los detalles
            if (detailsElement.style.display === 'none') {
                detailsElement.style.display = 'block';
                this.classList.remove('bx-hide');
                this.classList.add('bx-show'); // Cambiar al ícono de ojo normal
            } else {
                detailsElement.style.display = 'none';
                this.classList.remove('bx-show');
                this.classList.add('bx-hide'); // Cambiar al ícono de ojo tachado
            }
        });
    });
}

// Llamar a la función al cargar la página para asegurarse de que los íconos existentes funcionen
addToggleDetailsListeners();