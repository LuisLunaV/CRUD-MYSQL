const { validationResult } = require('express-validator');
//Atrapa los errores del bd-validators de los helpers y los devuelve en un json()
const validarCampos =( req, res, next )=>{
    
    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
 };

 module.exports={
    validarCampos
 }