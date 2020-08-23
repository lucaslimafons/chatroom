const express = require('express');
const router = express.Router();
const path = require('path');
const userChatService = require('../../services/user_chat');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(process.cwd(), 'views/signin.html'));
});

router.get('/signup', function (req, res, next) {
  res.sendFile(path.join(process.cwd(), 'views/signup.html'));
});

router.get('/logout', async function (req, res, next) {
  await userChatService.deleteByUserToken(req.cookies.token);
  res.clearCookie("token");
  res.sendFile(path.join(process.cwd(), 'views/logout.html'));
});

module.exports = router;
