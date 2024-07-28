document.addEventListener('DOMContentLoaded', function() {
    const playlist = document.getElementById('playlist');

    // Verifica que el elemento playlist existe
    if (!playlist) {
        console.error('El elemento playlist no se encontró.');
        return;
    }

    fetch('/api/canciones')
        .then(response => {
            console.log('Respuesta de la API recibida:', response);
            if (!response.ok) {
                throw new Error('Error al obtener las canciones');
            }
            return response.json();
        })
        .then(canciones => {
            console.log('Canciones obtenidas:', canciones);
            if (!Array.isArray(canciones) || canciones.length === 0) {
                console.warn('No se encontraron canciones.');
                return;
            }
            canciones.forEach(cancion => {
                const li = document.createElement('li');
                li.textContent = cancion;
                playlist.appendChild(li);
            });
        })
        .catch(error => console.error('Error al obtener las canciones:', error));
});
