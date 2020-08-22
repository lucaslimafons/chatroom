const messages = require('../helpers/messages');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'username',
      validate: {
        notNull: { msg: messages.username_required }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
      validate: { notNull: { msg: messages.password_required } }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'token'
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
  });

  return User;
};
