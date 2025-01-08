const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

const register = async (req, res) => {
    const {firstname, lastname, email, password } = req.body;
    
    if(!email){
        return res.status(400).send({ msg: 'El email es obligatorio.' })
    }
    if(!password){
        return res.status(400).send({ msg: 'La contraseña es obligatoria.' })
    }

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: 'user',
        active: false
    });

    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    //guardar usuario en base de datos
    try{
        await user.save();
        res.status(200).send({ msg:'El usuario se ha registrado correctamente.' })
    } catch (error) {
        res.status(400).send({ msg:'El usuario no se ha registrado.' })
    }
    
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email){
        return res.status(400).send({ msg: 'El email es obligatorio.' })
    }
    if(!password){
        return res.status(400).send({ msg: 'La contraseña es obligatoria.' })
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        const check = await bcrypt.compare(password, user.password);

        if (!check) {
            res.status(400).send({ msg: 'Contraseña Incorrecta' });
        } else if (!user.active) {
            res.status(401).send({ msg: 'Usuario no activo' });
        } else {
            res.status(200).send({ token: jwt.createAccessToken(user) });
        }

    } catch(error) {
        res.status(500).send({ msg: 'Usuario no registrado'});
    }
    
    
    
};

module.exports = {
    register,
    login,
};