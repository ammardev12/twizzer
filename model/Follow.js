const Sequelize = require('sequelize');


const Follow = sequelize.define(
    'follows',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        followedId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        followerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
)


module.exports = Follow