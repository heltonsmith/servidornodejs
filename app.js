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

// Ruta para manejar la solicitud POST de datos
app.post('/enviar-datos', (req, res) => {
    const datosRecibidos = req.body;
    console.log('Datos recibidos:', datosRecibidos);
    // Puedes enviar los datos a través de WebSocket aquí si es necesario
    res.send('Datos recibidos correctamente');
});


// Configura WebSocket para recibir datos del Arduino
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    // Maneja los datos recibidos desde el cliente (Arduino)
    socket.on('arduinoData', (data) => {
        console.log('Datos recibidos desde Arduino:', data);
        // Envía los datos a todos los clientes conectados (puedes personalizar esta lógica)
        io.emit('datosActualizados', data);
    });
});

// Escucha en el puerto 3000
http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
