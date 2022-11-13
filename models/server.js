const express = require('express');
const cors    = require('cors');

const { dbConnection } = require('../database/config.db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth'
        }

        // this.config = {
        //         "origin": "Access-Control-Allow-Origin:*",
        //         "methods": "POST",
        //         "preflightContinue": false,
        //         "optionsSuccessStatus": 204
        // }
        

        //Conectar a la bd
        this.conectarDB();
        //middlewares
        this.middlewares();
        //Rutas de la aplicacion
        this.router();
    }

    //Llamamos la conexion a la BD.
    async conectarDB(){
       await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use( cors( {
            origin:'*',
            methods:['GET', 'PUT', 'POST'],
            allowedHeaders:['Content-Type', 'Authorization'],
            exposedHeaders:['Content-Range', 'X-Content-Range'],
            credentials:true,
            optionsSuccessStatus:200
            // optionsSuccessStatus: 200
        } ) );
        //Lectura y parseo del body
        this.app.use( express.json() );
    }

    router(){
        this.app.use( this.paths.auth, require('../routes/auth.routes.js'));
        this.app.use( this.paths.usuarios, require('../routes/user.routes.js')); 
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('App levantada en el puerto:', this.port );
        })
    }

}

module.exports = {
    Server
}