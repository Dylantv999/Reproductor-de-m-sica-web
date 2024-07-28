const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configura Express para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener la lista de canciones
app.get('/api/canciones', (req, res) => {
    const cancionesDir = path.join(__dirname, 'canciones');
    fs.readdir(cancionesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo leer la carpeta de canciones' });
        }
        const canciones = files.filter(file => file.endsWith('.webm'));
        res.json(canciones);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
