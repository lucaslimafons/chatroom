const models = require('../models');
const BaseService = require('./base');
const ChatError = require('../helpers/error');
const messages = require('../helpers/messages');
const moment = require('moment');
const userChatService = require('./user_chat');

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
        socket.broadcast.emit('message', {
          'username': 'server',
          'message': data.username + ' has joined!',
          'time': moment()
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async message(data) {
    try {
      // HERE WE COULD SAVE ALL MESSAGES IF NECESSARY
      this.io.emit('message', {
        'username': data.username,
        'message': data.message,
        'time': data.time
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ChatService;
