export class Authenticator {

  static authenticate = (_user) => {
    const user = localStorage.getItem('user');
    if(!user) {
      localStorage.setItem('user', JSON.stringify(_user))
    }
    return this.isAuthenticated()
  }

  static logout() {
    localStorage.removeItem('user');
  }

  static isAuthenticated() {
    const user = localStorage.getItem('user');
    return !!user
  }
}