const express = require('express');
const router = express.Router();
const authService = require('../../services/auth');

router.post('/login', async (req, res) => {
  try {
    let data = await authService.login(req.body);
    return res.json({data: data, errors: null});
  } catch (err) {
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

router.post('/signup', async (req, res) => {
  try {
    let data = await authService.signUp(req.body);
    return res.json({ data: data, errors: null });
  } catch (err) {
    return res.status(err.data.status).json({ data: null, errors: err.data.errors });
  }
});

module.exports = router;
