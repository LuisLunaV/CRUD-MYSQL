const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models/user');

const usuarios = {
    userGet: async( req, res )=>{
      
        const query = { user_estado: true };
        // const users = await User.findAndCountAll({
        //     where: query,
        //     offset: 0,
        //     limit: 10 });
    
        const users = await User.findAll({ where: query });
        
        return res.status(200).json({
            users
        })
    },

    userGetId: async( req, res )=>{
       
        const { id } = req.params;
       
        const user = await User.findByPk( id );

        return res.status(200).json({
            user
         })
     },

    userPost: async( req, res )=>{
        
        const { user_name, user_email, user_password } = req.body;
        
        const user = new User( { user_name, user_email, user_password } );
        
        user.user_name = user_name.toUpperCase();
        
        const salt = bcryptjs.genSaltSync();
        user.user_password = bcryptjs.hashSync( user_password, salt );

        await user.save();

        return res.json({
             user
         })
     },

     userPut: async( req, res )=>{
        const { id } = req.params;
        const { body } = req;

        const user = await User.findByPk( id ) ;
        
        user.user_name = user_name.toUpperCase();
        
        await user.update( body , {new : true} );

        return res.status(200).json({
            user
         })
     },

     userDelet: async( req, res )=>{
        const { id } = req.params;
        const user = await User.findByPk( id ) ;
        await user.update( { user_estado: false });

        return res.status(200).json({
             msg: 'Usuario eliminado'
         })
     }
};


module.exports= usuarios;