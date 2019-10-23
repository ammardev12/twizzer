const Sequelize = require('sequelize');

const Like = sequelize.define(
    'likes',
    {
        id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

module.exports = Like;