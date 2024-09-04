document.addEventListener('DOMContentLoaded', () => {
    const newPqrsBtn = document.getElementById('newPqrsBtn');
    const pqrsForm = document.getElementById('pqrsForm');
    const form = document.getElementById('form');
    const pqrsList = document.getElementById('pqrsList');

    // Mostrar el formulario al hacer clic en "Agregar nueva PQRS"
    newPqrsBtn.addEventListener('click', () => {
        pqrsForm.classList.toggle('hidden');
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los datos del formulario
        const formData = {
            tipo: document.getElementById('tipo').value,
            asunto: document.getElementById('asunto').value,
            categoria: document.getElementById('categoria').value,
            descripcion: document.getElementById('descripcion').value
        };

        // Guardar la PQRS en localStorage
        let pqrsListStorage = JSON.parse(localStorage.getItem('pqrsList')) || [];
        pqrsListStorage.push(formData);
        localStorage.setItem('pqrsList', JSON.stringify(pqrsListStorage));

        // Actualizar la lista de PQRS en el frontend
        displayPqrsList();

        // Limpiar el formulario y ocultarlo
        form.reset();
        pqrsForm.classList.add('hidden');
    });

    // Mostrar la lista de PQRS al cargar la página
    const displayPqrsList = () => {
        pqrsList.innerHTML = '<h2>PQRS creadas</h2>';
        const pqrsListStorage = JSON.parse(localStorage.getItem('pqrsList')) || [];

        pqrsListStorage.forEach(pqrs => {
            const pqrsItem = document.createElement('div');
            pqrsItem.innerHTML = `<h3>${pqrs.asunto}</h3><p>${pqrs.descripcion}</p><p><strong>Tipo:</strong> ${pqrs.tipo} | <strong>Categoría:</strong> ${pqrs.categoria}</p>`;
            pqrsList.appendChild(pqrsItem);
        });
    };

    // Llamar a la función para mostrar las PQRS
    displayPqrsList();
});
