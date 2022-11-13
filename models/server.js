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

        this.allowlist = ['http://127.0.0.1:5500/CRUD-MYSQL/index.html', 'http://127.0.0.1:5500']
        this.corsOptionsDelegate = function (req, callback) {
          this.corsOptions;
          if (this.allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
          } else {
            corsOptions = { origin: false } // disable CORS for this request
          }
          callback(null, corsOptions) // callback expects two parameters: error and options
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
        this.app.use( cors( this.corsOptionsDelegate ),function (req, res, next) {
            res.json({msg: 'This is CORS-enabled for an allowed domain.'})
          } );
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