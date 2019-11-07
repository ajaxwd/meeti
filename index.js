const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const router = require('./routes');

// Configuración y Modelos BD
const db = require('./config/db');
    //require('./models/Usuarios');
    //require('./models/Categorias');
    //require('./models/Comentarios');
    //require('./models/Grupos');
    //require('./models/Meeti');
    db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

require ('dotenv').config({path: 'variables.env'});

const app = express();

//habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ubicacion de vistas
app.set('view', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

//Middleware (usuarios logueados, flash message,  fecha actual)
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();

    next();
});

//agregar routing
app.use('/', router());

//Agregar puerto
app.listen(process.env.PORT, () => {
    console.log('El servidor esta funcionando');
})
