const express = require('express');
const router = express.Router();
const userService = require('../../services/user');

router.get('/online', async (req, res) => {
  try {
    let data = await userService.findOnlineUsers();
    return res.json({data: data, errors: null});
  } catch (err) {
    console.log(err);
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

module.exports = router;
