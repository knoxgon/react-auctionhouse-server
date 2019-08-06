const express = require('express');
const router = express.Router();
const fileInt = require('../utils/zip-manager');
const mw = require('../utils/async-middleware');

router.get('/sales', fileInt, mw (async (req, res, next) => {
}));

module.exports = router;
