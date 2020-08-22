const bCrypt = require('bcrypt-nodejs');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = {
   createHash: function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
   },

   isValidPassword: function(user, password) {
      return bCrypt.compareSync(password, user.password);
   },

   generateToken: function(username, id) {
		return bCrypt.hashSync(username + guid(), bCrypt.genSaltSync(10), null);
	}
}
