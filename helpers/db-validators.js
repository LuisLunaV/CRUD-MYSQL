const { User } = require('../models/user');

//Vlidamos la existencia de los distintos valores en la DB.
const usuarioExistePorID = async( id )=>{
    const user = await User.findByPk( id );

    //Validamos si el id existe o si el usuario esta dado de baja.
    if( !user || !user.user_estado){
        throw new Error(`El id ${ id } no existe`);
    }


}

const emailExiste = async( user_email = '' )=>{
    const existeEmail = await User.findOne({ where: { user_email}});
    if( existeEmail ){
        throw new Error(`El correo ${ user_email} ya ha sido registrado`);
    }
}

module.exports={
    usuarioExistePorID,
    emailExiste
}

