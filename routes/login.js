const express = require('express');
const router = express.Router();
const asyncmw = require('../utils/async-middleware');
const login_ctrl = require('../controllers/login-controller')

router.post('/login', login_ctrl, asyncmw(async (req, res) => { }));

module.exports = router;
