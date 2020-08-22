export default class AuthService {
  async login(user) {
    try {
      let token = btoa(user.username + ':' + user.password);
      let auth_header = 'Basic ' + token;

      const response = await axios.get('/auth/login', {
        headers: { Authorization: auth_header, Accept: 'application/json' }
      });

      console.log(response);

      if (response.status === 200) {
        let user = response.data.data;

        if (user.ativo) {
          user.token = token;
          this.setUser(user);
        }

        return user;
      }
    } catch (e) {
      console.log(e)
      // throw this.getErrors(e);
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
    window.localStorage.setItem('chatroom', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('chatroom'));
  }
}
