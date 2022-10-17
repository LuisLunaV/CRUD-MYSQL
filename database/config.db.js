const { Sequelize } = require('sequelize');

const db = new Sequelize( process.env.NAME_DB, process.env.DB_USER , process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql' 
});

const dbConnection = async()=>{
    try {
        console.log(process.env.NAME_DB)
        console.log(process.env.DB_USER)
        console.log(process.env.DB_PASS)
        console.log(process.env.DB_HOST)
        console.log(process.env.PORT)

        console.log( db )
        await db.authenticate();
        console.log('Database en linea')
    } catch (error) {
        throw new Error( error );
    }
}
module.exports = { 
    db,
    dbConnection };