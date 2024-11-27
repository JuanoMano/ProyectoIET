import { onAuthChecking } from "../supabase/Client";

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

   onAuthChecking().then(session => {
    console.log(session)
   })
  
})

// FUNCION BOTON OPCIONES

// Get the options button and the options box
const optionsButton = document.getElementById('optionsButton');
const optionsBox = document.getElementById('optionsBox');

// Toggle the visibility of the options box when the button is clicked
optionsButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (optionsBox.style.display === 'none') {
        optionsBox.style.display = 'block';
    } else {
        optionsBox.style.display = 'none';
    }
});

// BOTON PQRS
document.getElementById('sendPQRS').addEventListener('click', function () {
    const pqrsModal = new bootstrap.Modal(document.getElementById('enviarPQRSModal'));
    pqrsModal.show();
});

//ENVIAR CORREOS PQRS

document.getElementById('pqrsForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tipo = document.getElementById('pqrsTipo').value;
    const asunto = document.getElementById('pqrsAsunto').value;
    const categoria = document.getElementById('pqrsCategoria').value;
    const correo = document.getElementById('pqrsCorreo').value;
    const descripcion = document.getElementById('pqrsDescripcion').value;

    const templateParams = {
        to_email: correo,
        subject: asunto,
        type: tipo,
        category: categoria,
        description: descripcion,
    };

    emailjs.send('service_euppjbn', 'Kevin Donoso', templateParams)
        .then(function(response) {
           alert('PQRS enviado exitosamente');
        }, function(error) {
           alert('Error al enviar PQRS');
        });
});

// MOSTRAR PQRS ENVIADOS

document.getElementById('pqrsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const tipo = document.getElementById('pqrsTipo').value;
    const asunto = document.getElementById('pqrsAsunto').value;
    const categoria = document.getElementById('pqrsCategoria').value;
    const correo = document.getElementById('pqrsCorreo').value;
    const descripcion = document.getElementById('pqrsDescripcion').value;

    // Agregar a la lista de PQRS enviados
    const pqrsEnviadosList = document.getElementById('pqrsEnviados');
    const listItem = document.createElement('li');
    listItem.textContent = `${tipo}: ${asunto} - ${categoria}`;
    pqrsEnviadosList.appendChild(listItem);

    // Enviar el correo
    const templateParams = {
        to_email: correo,
        subject: asunto,
        type: tipo,
        category: categoria,
        description: descripcion,
    };

    emailjs.send('service_euppjbn', 'Kevin Donoso', templateParams)
        .then(function(response) {
           alert('PQRS enviado exitosamente');
        }, function(error) {
           alert('Error al enviar PQRS');
        });
});

//BOTON CONTACTOS

document.getElementById('contacto').addEventListener('click', () => {
	window.open("/html/contactos.html", '_blank')
})

// Add functionality to the new <ul> options
document.getElementById('changePassword').addEventListener('click', function () {
    alert('Cambiar contraseña clicked');
    // Add your logic here
});

document.getElementById('sendPQRS').addEventListener('click', function () {
    alert('Enviar PQRS clicked');
    // Add your logic here
});

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