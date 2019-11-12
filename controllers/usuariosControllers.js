const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('/crear-cuenta', {
      nombrePagina: 'Crea tu cuenta'
    })
};


exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    
    try {
      const nuevoUsuario = await Usuarios.create(usuario);

      console.log('Se creo nuevo usuario', nuevoUsuario);
    } catch (error) {
      console.log(error);
    }
}