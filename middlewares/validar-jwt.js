const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

const validarJWT = async( req = request, res = response, next )=>{

    const token = req.header('Access-Control-Allow-Origin:*');

     if( !token ){

        return res.status(401).json({
            msg: 'No hay token de peticion'
        })

    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //Leer el usuario que corresponde al uid
        const user = await User.findOne({ where:{user_id: uid }} );
        
        //Verifica si el registro fue eliminado fisicamente de la BD
       if( !user ){
        return res.status(401).json({
            msg:'Token no valido - usuario no existe en BD'
        });
       }

       //Verificar si uid tiene estado en true //Eliminado
       if( !user.user_estado ){
        return res.status(401).json({
            msg:'Token no valido - usuario con estado false '
        });
       }

       req.user = user;
       next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}