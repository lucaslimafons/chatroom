class ChatError extends Error {
   constructor(msg, data) {
      super(msg);
      this.data = data;
   }
}

module.exports = ChatError;
