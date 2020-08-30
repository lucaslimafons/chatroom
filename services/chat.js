const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const messages = require('../helpers/messages');
const moment = require('moment');
const userChatService = require('./user_chat');
const messageService = require('./message');
const stockService = require('./stock');

class ChatService extends BaseService {
  constructor (io) {
    super();
    this.io = io;
  }

  async disconnect(socketId) {
    try {
      await userChatService.deleteBySocketId(socketId);
      this.io.emit('online', {});
    } catch (e) {
      console.log(e);
    }
  }

  async join(socket, data) {
    try {
      let numChats = await userChatService.countChatsByUser(data.userId);

      // ADD USER TO THE CURRENT TAB/SOCKET/CHAT
      await userChatService.create({ id_user: data.userId, socketId: socket.id });

      this.io.emit('online', {});

      // SHOWS TO EVERYONE THAT THE NEW USER JOINED TO THE CHAT
      if (numChats == 0) {
        let message = await messageService.create({
          message: data.username + ' has joined!',
          fromServer: true
        });

        socket.broadcast.emit('message', message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async message(data) {
    try {
      let message = await messageService.create({
        message: data.message,
        id_user: data.id
      });

      message = await messageService.findById(message.id);

      this.io.emit('message', message);

      if (data.message.startsWith('/stock=')) {
        let code = data.message.substr(data.message.indexOf('=')+1);
        let stock = await stockService.getStockQuoteApi(code, data.id);
        if (stock.data && stock.data.message) {
          message = await messageService.create({
            message: stock.data.message,
            fromServer: true
          });

          this.io.emit('message', message);
        } else if (stock.errors && stock.errors.length > 0) {
          this.io.emit('message', stock.errors[0].message);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ChatService;
