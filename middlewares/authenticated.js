const jwt = require('../utils/jwt');

function mdAuth (req, res, next) {
    
    //verificamos que el middleware reciba el token
    if (!req.headers.authorization) {
        res.status(403).send({ msg: 'La peticion no tiene cabecera..' });
    }
    
    //guardamos el token 
    const token = req.headers.authorization.replace('Bearer ', '');

    //funcion decode recibe datos detras del token
    try {
        const payload = jwt.decode(token)   
        const { exp } = payload;
        const currentData = new Date().getTime(); 

        if( exp <= currentData ) {
           return res.status(400).send({ msg: 'El token ha expirado.' })
        }
    
        //paso la info al controller
        req.user = payload;
        next();

    } catch (error) {
        return res.status(400).send({ msg: 'Token invalido.' })
    };

};

module.exports = {
    mdAuth
};