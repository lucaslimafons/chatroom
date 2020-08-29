const messages = require('../helpers/messages');

module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('message', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'message',
      validate: {
        notNull: { msg: messages.message_required }
      }
    },
    fromServer: { type: DataTypes.BOOLEAN,  allowNull: false, defaultValue: false, field: 'from_server'}
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  });

  Message.associate = function (models) {
    Message.belongsTo(models.user, {
        foreignKey: { name: 'id_user', allowNull: true },
        constraints: true,
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION"
    });
  }

  return Message;
};
