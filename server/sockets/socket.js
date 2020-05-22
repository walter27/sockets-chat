const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Usuarios();
io.on('connect', (client) => {


    client.on('entrarChat', (usuario, callback) => {

        if (!usuario.nombre || !usuario.sala) {

            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })

        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuario.nombre} se unio`))

        callback(usuarios.getPersonasPorSala(usuario.sala));


    })


    client.on('crearMensaje', (data,callback) => {


        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    })

    client.on('disconnect', () => {

        let perrsonaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(perrsonaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${perrsonaBorrada.nombre} salio`))
        client.broadcast.to(perrsonaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(perrsonaBorrada.sala));



    })

    //mensaje privado
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })


});