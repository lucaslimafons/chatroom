const express = require('express');
const router = express.Router();
const userService = require('../../services/user');
const producerService = require('../../services/producer');

router.get('/online', async (req, res) => {
  try {
    let data = await userService.findOnlineUsers();
    return res.json({data: data, errors: null});
  } catch (err) {
    console.log(err);
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

router.get('/stock-quote/:code?', async (req, res) => {
  try {
    let data = await producerService.sendParseStockQuote(req.params.code, req.user);
    return res.json({data: data, errors: null});
  } catch (err) {
    console.log(err);
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

module.exports = router;
