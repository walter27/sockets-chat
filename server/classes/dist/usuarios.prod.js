"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var n=0;n<r.length;n++){var s=r[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,r,n){return r&&_defineProperties(e.prototype,r),n&&_defineProperties(e,n),e}var Usuarios=function(){function r(e){_classCallCheck(this,r),this.personas=[]}return _createClass(r,[{key:"agregarPersona",value:function(e,r,n){var s={id:e,nombre:r,sala:n};return this.personas.push(s),this.personas}},{key:"getPersona",value:function(r){return this.personas.filter(function(e){return e.id===r})[0]}},{key:"getPersonas",value:function(){return this.personas}},{key:"getPersonasPorSala",value:function(r){return this.personas.filter(function(e){return e.sala===r})}},{key:"borrarPersona",value:function(r){var e=this.getPersona(r);return this.personas=this.personas.filter(function(e){return e.id!=r}),e}}]),r}();module.exports={Usuarios:Usuarios};