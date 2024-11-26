document.addEventListener("DOMContentLoaded", () => {
    const estrellas = document.querySelectorAll('.estrella');
    const favoritosTableBody = document.querySelector('#favoritos-body'); // Cuerpo de la tabla de favoritos
    const searchInput = document.querySelector('.filter-container input'); // Campo de búsqueda
    const reservarRows = document.querySelectorAll('section:nth-child(2) tbody tr'); // Filas de "Reservar Ahora"

    // Función para manejar el clic en las estrellas
    estrellas.forEach((estrella) => {
        estrella.addEventListener('click', () => {
            const fila = estrella.closest('tr'); // Obtener la fila donde está la estrella
            const idElemento = estrella.getAttribute('data-id'); // ID único del elemento

            // Verificar si el elemento ya está en favoritos
            const elementoEnFavoritos = favoritosTableBody.querySelector(`[data-id="${idElemento}"]`);

            if (!elementoEnFavoritos) {
                // Si no está en favoritos, agregarlo
                const nuevaFila = fila.cloneNode(true);

                // Remover la estrella en la tabla de favoritos
                const estrellaEnFavoritos = nuevaFila.querySelector('.estrella');
                if (estrellaEnFavoritos) {
                    estrellaEnFavoritos.remove();
                }

                // Agregar la fila clonada a la tabla de favoritos
                favoritosTableBody.appendChild(nuevaFila);

                // Marcar la estrella original como activa (morada)
                estrella.classList.add('morada');
            } else {
                // Si ya está en favoritos, eliminarlo
                elementoEnFavoritos.remove();

                // Quitar el estado de la estrella (morada)
                estrella.classList.remove('morada');
            }
        });
    });

    // Función para manejar la búsqueda en "Reservar Ahora"
    searchInput.addEventListener('input', (e) => {
        const filterValue = e.target.value.toLowerCase(); // Valor del campo en minúsculas

        reservarRows.forEach((row) => {
            const elemento = row.querySelector('td:first-child').textContent.toLowerCase(); // Primer campo (Elemento)
            if (elemento.includes(filterValue)) {
                row.style.display = ''; // Mostrar fila si coincide
            } else {
                row.style.display = 'none'; // Ocultar fila si no coincide
            }
        });
    });
});
