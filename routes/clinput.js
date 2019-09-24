const express = require('express');
const router = express.Router();

const asyncmw = require('../utils/async-middleware');
const clinputModel = require('../models/client-input-model');
let verifier = require('../auth/jwtVerifier');

/*
    {
        "productName": "golv tapet",
        "branch": "bygg",
        "terms": "fritt vårt lager",
        "amount": "20"
    }
*/

router.post('/clinput', verifier, asyncmw(async (req, res, next) => {
  req.body.username = req.decoded.user;
  if(!req.body.username) {
    return res.status(403).send({message: 'You are not authorized to make this transaction.'});
  }  
  let client_input = new clinputModel(req.body);
  //Validate credentials
  let results = client_input.joiValidate(req.body);
  if (results[0]) {
    await client_input.save().then(input => {
      res.status(201).send({message: 'Offert successfully created.'});
    })
  } else {
    //Send error list
    let arrs = results[1].message.split('. ');
    let newList = [];
    for (let i = 0; i < arrs.length; i++) {
      if(arrs[i].includes('productName')) {
         newList.push(JSON.stringify(
           { message: 'Please fill the product description.' }));
       }
       else if(arrs[i].includes('branch')) {
         newList.push(JSON.stringify(
           { message: 'Please select a branch.' }));
       }
       else if(arrs[i].includes('terms')) {
        newList.push(JSON.stringify(
          { message: 'Please choose the purchase condition.' }));
      }
      else if(arrs[i].includes('amount')) {
        newList.push(JSON.stringify(
          { message: 'Please select the amount.' }));
      }
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
