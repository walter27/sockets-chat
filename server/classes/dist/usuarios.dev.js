"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Usuarios =
/*#__PURE__*/
function () {
  function Usuarios(props) {
    _classCallCheck(this, Usuarios);

    this.personas = [];
  }

  _createClass(Usuarios, [{
    key: "agregarPersona",
    value: function agregarPersona(id, nombre, sala) {
      var persona = {
        id: id,
        nombre: nombre,
        sala: sala
      };
      this.personas.push(persona);
      return this.personas;
    }
  }, {
    key: "getPersona",
    value: function getPersona(id) {
      var persona = this.personas.filter(function (persona) {
        return persona.id === id;
      })[0];
      return persona;
    }
  }, {
    key: "getPersonas",
    value: function getPersonas() {
      return this.personas;
    }
  }, {
    key: "getPersonasPorSala",
    value: function getPersonasPorSala(sala) {
      var personasSala = this.personas.filter(function (persona) {
        return persona.sala === sala;
      });
      return personasSala;
    }
  }, {
    key: "borrarPersona",
    value: function borrarPersona(id) {
      var personaBorrada = this.getPersona(id);
      this.personas = this.personas.filter(function (persona) {
        return persona.id != id;
      });
      return personaBorrada;
    }
  }]);

  return Usuarios;
}();

module.exports = {
  Usuarios: Usuarios
};