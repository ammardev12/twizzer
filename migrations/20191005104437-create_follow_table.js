'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
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
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE
    
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('follow')
  }
};
