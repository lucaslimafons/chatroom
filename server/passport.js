const passport = require('passport');
const userService = require('../services/user');
const BearerStrategy = require('passport-http-bearer').Strategy;

// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=123456789
passport.use(new BearerStrategy(async function (token, done) {
  console.log('TOKEN DO USUÁRIO ::: ' + token);
  let user = await userService.findByToken(token);
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
}));

module.exports = passport;
