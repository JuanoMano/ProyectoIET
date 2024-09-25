const assignActivityBtn = document.getElementById('assignActivityBtn');
const activityModal = new bootstrap.Modal(document.getElementById('activityModal'));
const nameModal = new bootstrap.Modal(document.getElementById('nameModal'));
const activityForm = document.getElementById('activityForm');
const activityCardContainer = document.getElementById('activityCardContainer');

// Mostrar modal para ingresar actividad
assignActivityBtn.addEventListener('click', () => {
    activityModal.show();
});

// Manejar el envío del formulario de actividad
activityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const activityName = document.getElementById('activityName').value;
    const numMembers = document.getElementById('numMembers').value;
    const hours = document.getElementById('hours').value;
    const dueDate = document.getElementById('dueDate').value;

    // Crear la tarjeta con los detalles
    const activityCard = `
        <div class="card mb-3" style="max-width: 600px;">
            <div class="card-header">${activityName}</div>
            <div class="card-body align-items-center">
                <p class="card-text"><strong>Cantidad de integrantes:</strong> ${numMembers}</p>
                <p class="card-text"><strong>Cantidad de horas:</strong> ${hours}</p>
                <p class="card-text"><strong>Fecha límite:</strong> ${dueDate}</p>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-primary" id="takeActivityBtn">Realizar actividad</button>
                </div>
            </div>
        </div>
    `;

    // Agregar la nueva tarjeta al contenedor sin reemplazar las anteriores
    activityCardContainer.innerHTML += activityCard;

    // Cerrar el modal
    activityModal.hide();
});

// Mostrar modal para ingresar el nombre completo
document.addEventListener('click', (event) => {
    if (event.target.id === 'takeActivityBtn') {
        nameModal.show();
    }
});

// Manejar el envío del formulario de nombre completo
document.getElementById('nameForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener el nombre completo
    const fullName = document.getElementById('fullName').value;

    // Aquí puedes manejar el nombre completo según sea necesario (enviar a un servidor, etc.)

    // Cerrar el modal
    nameModal.hide();

    // Limpiar el campo de nombre completo
    document.getElementById('fullName').value = '';

    // Mostrar un mensaje de confirmación
    alert(`Actividad solicitada por: ${fullName}`);
});