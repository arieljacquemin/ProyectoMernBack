const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//importar rutas
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const movieRoutes = require('./router/movieRouter');


//configurar body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//configurar static folder
app.use(express.static('uploads'));


//configurar rutas
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', movieRoutes);



module.exports = app;