const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');
const usuariosControllers = require('../controllers/usuariosControllers');

module.exports = function() {
    router.get('/', homeControllers.home);

    //Crear y confirmar cuenta
    router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('/crear-cuenta', usuariosControllers.crearNuevaCuenta);
    router.get('/crear-cuenta/:correo', usuariosControllers.confirmarCuenta);

    //Iniciar sesion
    router.get('/iniciar-sesion', usuariosControllers.formIniciarSesion);

    return router;
}
