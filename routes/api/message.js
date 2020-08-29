const express = require('express');
const router = express.Router();
const messageService = require('../../services/message');

router.get('/', async (req, res) => {
  try {
    let data = await messageService.getLastMessages();
    return res.json({data: data, errors: null});
  } catch (err) {
    console.log(err);
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

module.exports = router;
