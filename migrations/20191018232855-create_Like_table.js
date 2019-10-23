'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
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
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
    )
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.dropTable('likes');
   
  }
};
