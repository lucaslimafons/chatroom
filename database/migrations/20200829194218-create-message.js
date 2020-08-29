'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('message', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        message: { type: Sequelize.TEXT, allowNull: false, field: 'message' },
        fromServer: { type: Sequelize.BOOLEAN,  allowNull: false, defaultValue: false, field: 'from_server'},
        createdAt: { type: Sequelize.DATE, allowNull: false, field: 'created_at' },
        updatedAt: { type: Sequelize.DATE, allowNull: false, field: 'updated_at' },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
              model: 'user',
              key: 'id'
          },
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
        }
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('message');
  }
};
