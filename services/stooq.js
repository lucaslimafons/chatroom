const models = require('../models');
const BaseService = require('./base');
const stringHelper = require('../helpers/string');
const messages = require('../helpers/messages');
const ChatError = require('../helpers/error');
const request = require('request-promise');
const fastcsv = require('@fast-csv/parse');

class StooqService extends BaseService {
  async getStockQuote(code) {
    try {
      if (stringHelper.isUndefinedOrNullOrEmpty(code)) {
        throw new ChatError(messages.stock_code_required, { field: null, status: 422 });
      }

      let csv = await this.getStockQuoteApi(code);

      let data = await this.parseStockQuoteData(csv);

      if (data && data.length > 0) {
        let stock = data[0];
        if (stock.Close !== 'N/D') {
          return messages.stock_quote_message
            .replace('{CODE}', code)
            .replace('{AMOUNT}', data[0].Close);
        } else {
          throw new ChatError(messages.stock_quote_error, { field: null, status: 422 });
        }
      }

      return data;
    } catch (e) {
      console.log(e);
      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async getStockQuoteApi(code) {
    try {
      const url = `${process.env.STOOQ_API_URL}`.replace('{STOCK_CODE}', code);
      let response = await request.get({
        uri: url,
        json: true
      });

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);

      throw new ChatError("Error", this.getErrors(e));
    }
  }

  async parseStockQuoteData(csv) {
    try {
      let data = [];

      return new Promise(function (resolve, reject) {
        fastcsv.parseString(csv, { headers: true, trim: true })
          .on('data', row => {
            console.log(row);
            data.push(row);
          })
          .on('error', (e) => {
            return reject(e);
          })
          .on('end', () => {
            console.log(data);
            return resolve(data);
          });
      });
    } catch (e) {
      throw new ChatError("Error", this.getErrors(e));
    }
  }
}
module.exports = new StooqService();
