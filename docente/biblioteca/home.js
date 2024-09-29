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
            <img src="/img/Estudiante.png">
            <p>${studentName}</p>
        </td>
        <td>${studentGrade}</td>
        <td>
            <span class="status pending">Pending</span>
            <button class="bx bx-edit"></button>
        </td>
    `;

    // Agregar la nueva fila a la tabla
    document.getElementById('student-list').appendChild(newRow);

    // Cerrar el modal
    const addStudentModal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    addStudentModal.hide();
});
