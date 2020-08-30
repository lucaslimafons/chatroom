class UserService {
  async getOnlineUsers() {
    try {
      const response = await axios.get('/user/online');
      return response.data.data;
    } catch (e) {
      throw baseService.getErrors(e);
    }
  }
}

const userService = new UserService();
