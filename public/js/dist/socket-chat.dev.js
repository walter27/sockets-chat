"use strict";

var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesario');
}

var usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala')
};
socket.on('connect', function () {
  console.log('coneectado al servidor');
  socket.emit('entrarChat', usuario, function (resp) {
    console.log('Uusarios conectados', resp);
  });
}); // escuchar

socket.on('disconnect', function () {
  console.log('Perdimos conexión con el servidor');
}); // Enviar información
//socket.emit('crearMensaje', {
//  usuario: 'Fernando',
//mensaje: 'Hola Mundo'
//}, function (resp) {
//  console.log('respuesta server: ', resp);
//});
// Escuchar información

socket.on('crearMensaje', function (mensaje) {
  console.log('Servidor:', mensaje);
}); //Escuchar cambios de usuarios
//Cunado usuario entra o sale del chat

socket.on('listaPersona', function (usuarios) {
  console.log(usuarios);
}); //Mensajes privados

socket.on('mensajePrivado', function (mensaje) {
  console.log('mensaje provado', mensaje);
});