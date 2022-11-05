const { response, json } = require('express');

const bcryptjs = require('bcryptjs');

const { User } = require('../models/user');

const login = async( req, res=response ) => {

    const { user_email, user_password } = req.body;

    try {
        //validamos que exist el correo
        const user = await User.findOne({where:{ user_email }});

        // Validamos si el email existe, o si esta activo en la BD.
        if( !user || !user.user_estado){
            return res.status(400).json({
                msg:`El usuario ${ user_email } no existe en esta BD`
            })
        };

        //Validamos el password del usuario
        const contraseñaValida = bcryptjs.compareSync( user_password, user.user_password );

        if( !contraseñaValida ){
          return res.status(400).json({
                msg:`La contraseña ${ user_password } no es valida`
            })
        };

        return res.json({
            user
        })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login
}