const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/homeControllers');
const usuariosControllers = require('../controllers/usuariosControllers');

module.exports = function() {
    router.get('/', homeControllers.home);

    router.get('crear-cuenta', usuariosControllers.formCrearCuenta);

    return router;
}