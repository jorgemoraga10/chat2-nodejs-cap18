var socket = io();


var params =  new URLSearchParams( window.location.search );

if ( !params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

const usuario = { 
    nombre: params.get('nombre'),
    sala: params.get('sala')
};




//escuchando cuando un socket se conecta 
socket.on('connect', function() {
    
    console.log('Conectado al servidor');

    socket.emit('entrar-Chat', usuario, function( resp ) {
        console.log('Usuarios Conectados', resp);
        renderizarUsuarios(resp);
    });
});




// escuchancho cuando se desconecta un sockey 
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});




// Enviar información
// socket.emit('crear-mensaje', {
//     usuario: 'Jorge',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });




// Escuchar información
socket.on('crear-mensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
    renderizarMensajes( mensaje, false );
    scrollBottom();
});




//Escuchar cuando un usuario entra o sale de las salas
socket.on('lista-persona', function(personas) {
    console.log(personas);
    renderizarUsuarios(personas );
});


//accion de escuchar del cliente de un mensaje privado
socket.on('mensaje-privado', function( mensaje ) {
    console.log('Mensaje Privado:', mensaje );
})