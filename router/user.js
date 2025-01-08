const express = require('express');
const UserController = require('../controllers/user');
const md_Auth = require('../middlewares/authenticated');


const api = express.Router();

api.get('/user/me', [md_Auth.mdAuth], UserController.getMe);
api.get('/users', UserController.getUsers); 



module.exports = api; 