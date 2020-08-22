'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('user', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: Sequelize.STRING(100),   allowNull: false, field: 'username' },
        password: { type: Sequelize.STRING(255),   allowNull: false, field: 'password'},
        token: { type: Sequelize.STRING(255),   allowNull: true, field: 'token' },
        createdAt: { type: Sequelize.DATE,   allowNull: false, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE,   allowNull: false, field: 'updated_at' }
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};
