const messages = require('../helpers/messages');

module.exports = function (sequelize, DataTypes) {
  const UserChat = sequelize.define('userChat', {
    socketId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'socket_id',
      validate: {
        notNull: { msg: messages.socket_required }
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'user_chat'
  });

  UserChat.associate = function (models) {
    UserChat.belongsTo(models.user, {
        foreignKey: { name: 'id_user', allowNull: false },
        constraints: true,
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
    });
  }

  return UserChat;
};
