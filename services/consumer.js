const BaseService = require('./base');
const ChatError = require('../helpers/error');
const moment = require('moment');
const userService = require('./user');
const messageService = require('./message');

class ConsumerService extends BaseService {
  async resultStockQuote(code, idUser, result) {
    try {

      let user = await userService.findById(idUser);

      let text = '';
      if (result.data && result.data.errors && result.data.errors.length > 0) {
        let error = result.data.errors[0].message;
        text = `Stock quote result for ${user.username}: ${error}`;
      } else {
        text = `Stock quote result ${user.username}: ${result}`;
      }

      let message = await messageService.create({
        message: text,
        fromServer: true
      });

      global.io.emit('message', message);
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = new ConsumerService();
