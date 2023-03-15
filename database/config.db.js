const { Sequelize } = require('sequelize');

const db = new Sequelize( process.env.DB_URL);

const dbConnection = async()=>{
    try {

        await db.authenticate();
        console.log('Database en linea')
    } catch (error) {
        throw new Error( error );
    }
}
module.exports = { 
    db,
    dbConnection };