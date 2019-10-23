const Sequelize = require('sequelize');
// const db = {};
 
const sequelize = new Sequelize("socialapp", "root", "", {
    host: "localhost",
    dialect: "mysql",
    opratorAliases: false,
 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});



module.exports = sequelize;

global.sequelize = sequelize