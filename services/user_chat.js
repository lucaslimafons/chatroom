const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const messages = require('../helpers/messages');
const authHelper = require('../helpers/auth');
const userService = require('./user');

class UserChatService extends BaseService {
  async countChatsByUser(userId) {
    try {
      return await models.userChat.count({
        where: { id_user: userId }
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async create(model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await models.userChat.build(model).validate();
      model = await models.userChat.create(model, { transaction });

      await transaction.commit();

      return model;
    } catch (e) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async deleteBySocketId(socketId) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await models.userChat.destroy({ where: { socketId: socketId }, transaction });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async deleteByUserToken(token) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      let user = await userService.findByToken(token);
      if (user && user.id > 0) {
        await models.userChat.destroy({ where: { id_user: user.id }, transaction });
      }

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }
}

module.exports = new UserChatService();
