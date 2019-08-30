const express = require('express');
const router = express.Router();

const asyncmw = require('../utils/async-middleware');
let verifier = require('../auth/jwtVerifier');
let companyCtrl = require('../controllers/company-controller');

//Get company through validation
router.get('/company/validation', [verifier, companyCtrl.FetchCompanyFromToken], asyncmw(async (req, res, next) => { }));
//Get company through email
router.get('/company/:email', [verifier, companyCtrl.fetchCompany], asyncmw(async (req, res, next) => { }));

//router.get('/users', [verifier, userCtrl.fetchUsers], asyncmw(async (req, res, next) => { }));
//router.delete('/users/:username', [verifier, userCtrl.removeOneUser], asyncmw(async (req, res) => { }));

module.exports = router;
