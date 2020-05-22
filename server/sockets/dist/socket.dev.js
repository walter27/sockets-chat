"use strict";

var _require = require('../server'),
    io = _require.io;

var _require2 = require('../classes/usuarios'),
    Usuarios = _require2.Usuarios;

var _require3 = require('../utilidades/utilidades'),
    crearMensaje = _require3.crearMensaje;

var usuarios = new Usuarios();
io.on('connect', function (client) {
  client.on('entrarChat', function (usuario, callback) {
    if (!usuario.nombre || !usuario.sala) {
      return callback({
        error: true,
        mensaje: 'El nombre/sala es necesario'
      });
    }

    client.join(usuario.sala);
    usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
    client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));
    client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', "".concat(usuario.nombre, " se unio")));
    callback(usuarios.getPersonasPorSala(usuario.sala));
  });
  client.on('crearMensaje', function (data, callback) {
    var persona = usuarios.getPersona(client.id);
    var mensaje = crearMensaje(persona.nombre, data.mensaje);
    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    callback(mensaje);
  });
  client.on('disconnect', function () {
    var perrsonaBorrada = usuarios.borrarPersona(client.id);
    client.broadcast.to(perrsonaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', "".concat(perrsonaBorrada.nombre, " salio")));
    client.broadcast.to(perrsonaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(perrsonaBorrada.sala));
  }); //mensaje privado

  client.on('mensajePrivado', function (data) {
    var persona = usuarios.getPersona(client.id);
    client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
  });
});