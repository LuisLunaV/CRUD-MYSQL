const { DataTypes } = require('sequelize');

const { db } = require('../database/config.db');

//El nombre del modelo y tamaño de letra deben de coincidir con el nombre de la tabla de la BD
//Si la tabla se llama "usuarios", el modelo debe llamarse usuario
const User = db.define('user',{ 

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        required: [true, 'El nombre es obligatorio']
    },

    user_email: {
        type: DataTypes.STRING,
        required: [true, 'El correo es obligatorio']
    },

    user_password: {
        type: DataTypes.STRING,
        required: [true, 'El password es obligatorio']
    },

    user_rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL','USER_ROL']
    },

    user_estado: {
        type: DataTypes.BOOLEAN,
    }
    
 

}, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }); 

//   defaultScope: {
//     attributes: { exclude: ['user_password', 'createdAt', 'updatedAt'] }

module.exports = {
    User
};