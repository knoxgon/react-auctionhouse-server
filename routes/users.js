const express = require('express');
const router = express.Router();

const asyncmw = require('../utils/async-middleware');
let verifier = require('../auth/jwtVerifier');
let userCtrl = require('../controllers/user-controller');

router.get('/users', [verifier, userCtrl.fetchUsers], asyncmw(async (req, res, next) => { }));
router.get('/users/verify', [verifier, userCtrl.fetchOneUser], asyncmw(async (req, res, next) => { }));
router.get('/users/:username', [verifier, userCtrl.fetchOneUser], asyncmw(async (req, res, next) => { }));
router.delete('/users/:username', [verifier, userCtrl.removeOneUser], asyncmw(async (req, res) => { }));

module.exports = router;
