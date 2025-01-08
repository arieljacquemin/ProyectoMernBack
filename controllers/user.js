const User = require('../models/user');

//aca obtengo el usuario atravez del token
async function getMe(req, res) {
    const { user_id } = req.user;

    const user = await User.findById(user_id);
    if (!user) {
        res.status(400).send({ msg: 'El usuario no existe.' });
    } else {
        res.status(200).send(user);
    }
}


async function getUsers(req, res) {
    try{        
        const users = await User.find();
        res.status(200).send(users);
        
    } catch(error) {
        res.status(400).send({ msg: 'Error al obtener los usuarios' });
    }
}

module.exports = {
    getMe,
    getUsers,
};