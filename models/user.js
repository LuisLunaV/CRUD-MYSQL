const { DataTypes } = require('sequelize');

const { sequelize } = require('../database/config.db');

const User = sequelize.define('User',{

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

    user_estado: {
        type: DataTypes.BOOLEAN,
    }

}); 


module.exports = {
    User
};