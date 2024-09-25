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
        // displayPqrsList();

        // Limpiar el formulario y ocultarlo
        form.reset();
        pqrsForm.classList.add('hidden');
    });

});
