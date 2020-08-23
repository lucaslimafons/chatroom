const express = require('express');
const router = express.Router();
const middlewareWeb = require('../middlewares/web');

router.use('/api/auth', require('./api/auth'));

router.use('/', require('./web/auth'));
router.use('/chat', middlewareWeb.validateToken, require('./web/chat'));

module.exports = router;
