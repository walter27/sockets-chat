"use strict";var socket=io(),params=new URLSearchParams(window.location.search);if(!params.has("nombre")||!params.has("sala"))throw window.location="index.html",new Error("El nombre y sala son necesario");var usuario={nombre:params.get("nombre"),sala:params.get("sala")};socket.on("connect",function(){console.log("coneectado al servidor"),socket.emit("entrarChat",usuario,function(o){console.log("Uusarios conectados",o)})}),socket.on("disconnect",function(){console.log("Perdimos conexión con el servidor")}),socket.on("crearMensaje",function(o){console.log("Servidor:",o)}),socket.on("listaPersona",function(o){console.log(o)}),socket.on("mensajePrivado",function(o){console.log("mensaje provado",o)});