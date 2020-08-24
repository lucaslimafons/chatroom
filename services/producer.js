const BaseService = require('./base');
const ChatError = require('../helpers/error');
const kafkaProducer = require('../server/kafka-producer');

class ProducerService extends BaseService {
  async sendParseStockQuote(code, user) {
    try {
      return await new Promise(function (resolve, reject) {
        kafkaProducer.send([
          {
            topic: process.env.KAFKA_TOPIC_PARSE,
            messages: [
              JSON.stringify({
                code: code,
                user: user
              })
            ]
          }
        ], (err, data) => {
          if (err) {
            console.log('[kafka-producer -> parse_stock_quote]: broker update failed');
            reject(err);
          } else {
            console.log('[kafka-producer -> parse_stock_quote]: broker update success');
            resolve(data);
          }
        });
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async sendResultStockQuote(data) {
    try {
      return await new Promise(function (resolve, reject) {
        kafkaProducer.send([
          {
            topic: process.env.KAFKA_TOPIC_RESULT,
            messages: [data]
          }
        ], (err, data) => {
          if (err) {
            console.log('[kafka-producer -> result_stock_quote]: broker update failed');
            reject(err);
          } else {
            console.log('[kafka-producer -> result_stock_quote]: broker update success');
            resolve(data);
          }
        });
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }
}

module.exports = new ProducerService();
