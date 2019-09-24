const express = require('express');
const router = express.Router();
const asyncmw = require('../utils/async-middleware');
const login_ctrl = require('../controllers/login-controller')

/*

  company: {
    {
      "email": "angels@allabolag.se",
      "password": "weArenotheretoGetAnything58129"
    },
    {
      "email": "admin.office@bo.verkstad.com",
      "password": "298@8FAUHJ4Tohrq1"
    }
  }

  //either email or username
  client: {
    {
      "email": "neutro_patrol@ssu.menningrad.co.uk",
      "username": "aritros200x",
      "password": "deimyaloaritmet4fa7@"
    },
    {
      "email": "john_doe@hotmail.com",
      "username": "jd1995",
      "password": "#@589142fa9"
    }
  }

*/

router.post('/login/client', login_ctrl.client_controller, asyncmw(async (req, res) => { }));
router.post('/login/company', login_ctrl.company_controller, asyncmw(async (req, res) => { }));

module.exports = router;
