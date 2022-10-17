const { request, response } = require('express');

const { User } = require('../models/user');

const usuarios = {
    userGet: async( req, res )=>{
      
        const users = await User.findAll()
    
        return res.status(200).json({
            users
        })
    },

    userGetId: async( req, res )=>{
       
        const { id } = req.params;
       
        const { user_id, user_name, user_email, user_estado } = await User.findByPk( id );

        return res.status(200).json({
            user_id,
            user_name, 
            user_email, 
            user_estado
         })
     },

    userPost: async( req, res )=>{
        const { body } = req;

        const user = new User( body );
        await user.save();

        return res.json({
             user
         })
     },

     userPut: async( req, res )=>{
        const { id } = req.params;
        const { body } = req;

        const user = await User.findByPk( id ) ;
        
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