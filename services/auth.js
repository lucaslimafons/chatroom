const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const stringHelper = require('../helpers/string');
const authHelper = require('../helpers/auth');
const userService = require('./user');
const messages = require('../helpers/messages');

class AuthService extends BaseService {
  async login(model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      if (stringHelper.isUndefinedOrNullOrEmpty(model.username) || stringHelper.isUndefinedOrNullOrEmpty(model.password)) {
        throw new ChatError(messages.invalid_credentials, { status: 422 });
      }

      let user = await userService.findByUsername(model.username);

      if (!user || !authHelper.isValidPassword(user, model.password))
        throw new ChatError(messages.invalid_credentials, { status: 422 });

      user.token = authHelper.createHash(model.username);

      await userService.update(user.id, { token: user.token }, transaction);

      user.password = null;

      await transaction.commit();

      return user;
    } catch (e) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async signUp(model) {
    const transaction = await models.sequelize.transaction({ autocommit: false });

    try {
      let user = {
        username: model.username,
        password: model.password,
        token: authHelper.createHash(model.username)
      };

      user = await userService.create(user, transaction);

      user.password = null;

      await transaction.commit();

      return user;
    } catch (err) {
      await transaction.rollback();
      throw new ChatError("Error", this.getErrors(err));
    }
  }
}

module.exports = new AuthService();
