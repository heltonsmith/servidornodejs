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
    // Puedes emitir los datos a través de WebSocket aquí si es necesario
    io.emit('datosActualizados', datosRecibidos); // Envía los datos a todos los clientes conectados
    res.send('Datos recibidos correctamente');
});

// Configura WebSocket para recibir datos del cliente
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
});

// Escucha en el puerto 3000
http.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
