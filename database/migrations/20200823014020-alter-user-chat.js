'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('user_chat', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        socketId: { type: Sequelize.STRING(100), allowNull: false, field: 'socket_id' },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
    return queryInterface.dropTable('user_chat');
  }
};
