const BaseService = require('./base');
const ChatError = require('../helpers/error');
const kafkaProducer = require('../server/kafka-producer');
const stooqService = require('./stooq');
const producerService = require('./producer');
const moment = require('moment');

class ConsumerService extends BaseService {
  async parseStockQuote(code, user) {
    let result = {
      code: code,
      user: user
    };

    try {
      let stockQuote = await stooqService.getStockQuote(code);
      result.result = stockQuote;
      producerService.sendResultStockQuote(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      result.result = e;
      producerService.sendResultStockQuote(JSON.stringify(result));
    }
  }

  async resultStockQuote(code, user, result) {
    try {
      let message = '';
      if (result.data && result.data.errors && result.data.errors.length > 0) {
        let error = result.data.errors[0].message;
        message = `Stock quote result for ${user.username}: ${error}`;
      } else {
        message = `Stock quote result ${user.username}: ${result}`;
      }

      global.io.emit('message', {
        'username': 'server',
        'message': message,
        'time': moment()
      });
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = new ConsumerService();
