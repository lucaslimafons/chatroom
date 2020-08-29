class MessageService {
  async getLastMessages() {
    try {
      const response = await axios.get('/message');
      return response.data.data;
    } catch (e) {
      throw baseService.getErrors(e);
    }
  }
}

const messageService = new MessageService();
