const express = require('express');
const cors    = require('cors');

const { dbConnection } = require('../database/config.db');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.whiteList = ['http://127.0.0.1:5500','http://127.0.0.1:5500/'];

        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth'
        }


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
        this.app.use( cors({ origin: this.whiteList }) );
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