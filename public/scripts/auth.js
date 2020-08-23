class AuthService {
  async login(user) {
    try {
      const response = await axios.post('/auth/login', user);

      if (response.status === 200) {
        let user = response.data.data;
        this.setUser(user);

        return user;
      }
    } catch (e) {
      throw baseService.getErrors(e);
    }
  }

  async signUp(user) {
    try {
      const response = await axios.post('/auth/signup', user);

      if (response.status === 200) {
        let user = response.data.data;
        this.setUser(user);

        return user;
      }
    } catch (e) {
      throw baseService.getErrors(e);
    }
  }

  logout() {
    window.localStorage.removeItem('chatroom');
  }

  isLoggedIn() {
    let user = this.getUser();
    return user != undefined && user != null && user.token;
  }

  setUser(user) {
    document.cookie = `token=${user.token}`;
    window.localStorage.setItem('chatroom', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('chatroom'));
  }
}

const authService = new AuthService();
