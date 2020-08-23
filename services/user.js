const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const messages = require('../helpers/messages');
const authHelper = require('../helpers/auth');

class UserService extends BaseService {
  async listAll() {
    try {
      return await models.user.findAll({ });
    } catch (e) {
      throw new DWError("Error", this.getErrors(e));
    }
  }

  async findById(id) {
    try {
      return await this.findOne({ where: { id: id } });
    } catch (e) {
      throw new DWError("Error", this.getErrors(e));
    }
  }

  async findByUsername(username) {
    try {
      return await models.user.findOne({ where: { username: username } });
    } catch (e) {
      throw new DWError("Error", this.getErrors(e));
    }
  }

  async findByToken(token) {
    try {
      return await models.user.findOne({ where: { token: token } });
    } catch (e) {
      throw new DWError("Error", this.getErrors(e));
    }
  }

  async create(model, transaction) {
    const commit = !transaction;
    if (!transaction) transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      await this.validate(model);

      model.password = authHelper.createHash(model.password);

      await models.user.build(model).validate();
      model = await models.user.create(model, { transaction });

      if (commit) await transaction.commit();

      return model;
    } catch (e) {
      if (commit) await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async update(id, model, transaction) {
    const commit = !transaction;
    if (!transaction) transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      console.log(model);
      let a = await models.user.update(model, { where: { id: id } }, { transaction });
      console.log(a);

      if (commit) await transaction.commit();
    } catch (e) {
      if (commit) await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async validate(user) {
    await models.user.build(user).validate();

    let userDb = await models.user.findOne({ where: { username: user.username } });
    if (userDb && userDb.id > 0) {
      throw new ChatError(messages.username_used, { field: 'username', status: 422 });
    }
  }
}

module.exports = new UserService();
