const Sequelize = require('sequelize');


const Scehma = sequelize.define(
    'comments',
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
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING
            
        }
    }
);

module.exports = Scehma;