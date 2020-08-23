const express = require('express');
const router = express.Router();
const middlewareWeb = require('../middlewares/web');
const passport = require('passport');

router.use('/api/auth', require('./api/auth'));
router.use('/api/user', passport.authenticate('bearer', { session: false }), require('./api/user'));

router.use('/', require('./web/auth'));
router.use('/chat', middlewareWeb.validateToken, require('./web/chat'));

module.exports = router;
