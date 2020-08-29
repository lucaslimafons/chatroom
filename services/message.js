const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const messages = require('../helpers/messages');
const stringHelper = require('../helpers/string');

class MessageService extends BaseService {
  async getLastMessages() {
    try {
      return await models.message.findAll({
        limt: 50,
        order: [['id', 'asc']],
        where: { fromServer: false },
        include: {
          model: models.user,
          attributes: ['id', 'username']
        }
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async findById(id) {
    try {
      return await models.message.findOne({
        where: { id: id },
        include: {
          model: models.user,
          attributes: ['id', 'username']
        }
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async create(model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await models.message.build(model).validate();
      model = await models.message.create(model, { transaction });

      await transaction.commit();

      return model;
    } catch (e) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }
}

module.exports = new MessageService();
