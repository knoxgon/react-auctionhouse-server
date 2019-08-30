const express = require('express');
const router = express.Router();

const asyncmw = require('../utils/async-middleware');
let verifier = require('../auth/jwtVerifier');
let clientCtrl = require('../controllers/client-controller');

//Get client through validation
router.get('/users/validation', [verifier, clientCtrl.FetchClientFromToken], asyncmw(async (req, res, next) => { }));
//Get client through email/username
router.get('/users/:username', [verifier, clientCtrl.fetchClient], asyncmw(async (req, res, next) => { }));

//router.get('/users', [verifier, userCtrl.fetchUsers], asyncmw(async (req, res, next) => { }));
//router.delete('/users/:username', [verifier, userCtrl.removeOneUser], asyncmw(async (req, res) => { }));

module.exports = router;
