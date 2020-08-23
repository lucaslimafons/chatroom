const userService = require('../services/user');
const stringHelper = require('../helpers/string');

exports.validateToken = async function (req, res, next) {
	try {
    if (!stringHelper.isUndefinedOrNullOrEmpty(req.cookies.token)) {
      let user = await userService.findByToken(req.cookies.token);
      if (user && user.id > 0) {
        next();
      } else {
        res.redirect('/logout');
      }
    } else {
      res.redirect('/logout');
    }
	} catch (err) {
    res.redirect('/logout');
	}
};
