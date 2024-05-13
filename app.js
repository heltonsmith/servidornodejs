const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Middleware para analizar el cuerpo de la solicitud JSON
app.use(express.json());

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Configura WebSocket para recibir datos del cliente
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    // Maneja los datos recibidos desde el cliente
    socket.on('datosActualizados', (data) => {
        console.log('Datos recibidos desde el cliente:', data);
        // Envía los datos a todos los clientes conectados
        io.emit('datosActualizados', data);
    });
});

// Escucha en el puerto 3000
http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
