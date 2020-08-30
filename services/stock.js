const BaseService = require('./base');
const stringHelper = require('../helpers/string');
const messages = require('../helpers/messages');
const ChatError = require('../helpers/error');
const request = require('request-promise');

class StockService extends BaseService {
  async getStockQuoteApi(code, idUser) {
    try {
      let response = await request.post({
        uri: `${process.env.CHATROOM_STOCK}`,
        body: {
          code: code,
          user: idUser
        },
        json: true
      });

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);

      throw new ChatError("Error", this.getErrors(e));
    }
  }
}
module.exports = new StockService();
