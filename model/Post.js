const Sequelize = require('sequelize');


const Scehma = sequelize.define(
    'posts',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        postBody: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postImage: {
            type: Sequelize.STRING
            
        }
    }
);

module.exports = Scehma;