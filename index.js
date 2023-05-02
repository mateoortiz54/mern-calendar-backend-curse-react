// Ayuda a montar los servidores y el listen de ellos
const express = require('express');
const { dbconection } = require('./database/config');

// Para las variables de entorno
require('dotenv').config();

const cors = require('cors');


// Ver procesos que están corriendo
// console.log(process.env)


// inicializamos y creamos el servidor express, 
const app = express();

// Base de Datos
dbconection();

// CORS
app.use(cors())

// Lo mando a este lugar por predeterminado
// Directorio Público
app.use(express.static('public'));

//middleware
// Lectura y parseo del body
app.use(express.json())


//Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: auth // crear, login, renew
// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));



// Escuchar peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})