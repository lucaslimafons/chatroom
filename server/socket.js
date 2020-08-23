const ChatService = require('../services/chat');

module.exports = function (io) {
  const chatService = new ChatService(io);

  io.on('connection', (socket) => {
    socket.on('disconnect', async () => {
      console.log(`disconnect:  ${socket.id}`);
      await chatService.disconnect(socket.id);
    });

    socket.on('join', async (data) => {
      console.log(`join:  ${socket.id}`);
      await chatService.join(socket, data);
    });

    socket.on('message', async (data) =>  {
      await chatService.message(data);
    });
  });
}
