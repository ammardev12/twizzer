'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return  queryInterface.createTable(
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
            
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    }
    )
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable('posts')
  }
};
