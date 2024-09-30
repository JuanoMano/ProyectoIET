import { onAuthChecking, insertGlobalA } from "../../supabase/Client";

//honestamente no se para que funciona

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})




//RESPONSIVE EN SITUACIONES CONCRETAS

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})




// FUNCION DEL SWTICH MODE

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})




//SCRIPTS PARA LA LISTA DE ESTUDIANTES 

// Mostrar el modal al hacer clic en el botón "bx-plus"
document.getElementById('add-student-btn').addEventListener('click', function() {
    const addStudentModal = new bootstrap.Modal(document.getElementById('studentModal'));
    addStudentModal.show();
});

// Manejar el envío del formulario dentro del modal
document.getElementById('regEst').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const studentName = document.getElementById('name').value;
    const studentGrade = document.getElementById('grade').value;

    // Crear una nueva fila para la tabla
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <img src="/img/iconEst.png">
            <p>${studentName}</p>
        </td>
        <td>${studentGrade}</td>
        <td>
            <span class="status pending">Pending</span>
            <a class="bx bx-edit"></a>
        </td>
    `;

    // Agregar la nueva fila a la tabla
    document.getElementById('student-list').appendChild(newRow);

    // Cerrar el modal
    const addStudentModal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    addStudentModal.hide();
});




//SCRIPS PARA LAS ACTIVIDADES

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
    const numMembers = document.getElementById('numMembers').value;
    const hours = document.getElementById('hours').value;
    const dueDate = document.getElementById('dueDate').value;
    const details = document.getElementById('activityDetails').value
    let name

	await onAuthChecking().then(session => {
	    name = session.user.user_metadata.name
	})

    //llamar a la funcion para subir los datos de la actividad a la base de datos.
    await insertGlobalA(activityName, numMembers, hours, dueDate, name, details)

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