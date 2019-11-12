const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const router = require('./routes');

// Configuración y Modelos BD
const db = require('./config/db');
    require('./models/Usuarios');
    //require('./models/Categorias');
    //require('./models/Comentarios');
    //require('./models/Grupos');
    //require('./models/Meeti');
    db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

require ('dotenv').config({path: 'variables.env'});

const app = express();

//Body parser leer formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express validator (validación con bastantes funciones)
app.use(expressValidator());

//habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//ubicacion de vistas
app.set('view', path.join(__dirname, './views'));

//archivos estaticos
app.use(express.static('public'));

// habilitar cookie parser
app.use(cookieParser());

// crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave : false,
    saveUninitialized : false
}))

// Agrega flash messages
app.use(flash());

//Middleware (usuarios logueados, flash message,  fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
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
