const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize( process.env.NAME_DB, process.env.DB_USER , process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql' 
// });

const sequelize = new Sequelize( process.env.BASE_URL );
const dbConnection = async()=>{
    try {

        await sequelize.authenticate();
        console.log('Database en linea')
    } catch (error) {
        throw new Error( error );
    }
}
module.exports = { 
    sequelize,
    dbConnection };