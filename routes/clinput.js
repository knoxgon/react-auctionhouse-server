const express = require('express');
const router = express.Router();

const asyncmw = require('../utils/async-middleware');
const clinputModel = require('../models/client-input-model');
let verifier = require('../auth/jwtVerifier');

/*
    {
        "productName": "golv tapet",
        "branch": "bygg",
        "terms": "fritt från lager",
        "amount": "20"
    }
*/

router.post('/clinput', verifier, asyncmw(async (req, res, next) => {
  req.body.username = req.decoded.user;
  let client_input = new clinputModel(req.body);
  //Validate credentials
  let results = client_input.joiValidate(req.body);
  if (results[0]) {
    await client_input.save().then(input => {
      res.sendStatus(201);
    })
  } else {
    //Send error list
    let arrs = results[1].message.split('. ');
    let newList = [];
    for (var i = 0; i < arrs.length; i++) {
      newList.push(JSON.stringify(
        { errorMessage: arrs[i] })
        .replace(/[\\'"]+/g, ''));
    }
    res.status(400).send(newList);
  }
}));

router.get('/clinput', verifier, asyncmw(async (req, res, next) => {
  //Get all inputs
  await clinputModel.find({},
    { _id: 0, __v: 0 },
    (err, doc) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(doc);
    })
}));

module.exports = router;
