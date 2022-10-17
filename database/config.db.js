const { Sequelize } = require('sequelize');

const db = new Sequelize( process.env.DATABASE, process.env.USER , process.env.PASS, {
    host: 'localhost',
    dialect: 'mysql' 
});

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