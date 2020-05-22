"use strict";

var crearMensaje = function crearMensaje(nombre, mensaje) {
  return {
    nombre: nombre,
    mensaje: mensaje,
    fecha: new Date().getTime()
  };
};

module.exports = {
  crearMensaje: crearMensaje
};