const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

const bcrypt = require('bcrypt');

const excludeFields = {password: 0, _id: 0, __v: 0};

///////GET all///////

router.get('/users', (req, res) => {
/*We want to extract everything but password, id, and version*/
    userModel.find({}, excludeFields, (err, users) => res.send(users));
});

///////GET specific///////

//Find user based on the username;
router.get('/users/:username', (req, res) => {
   userModel.find(
       {username: req.params.username}, //Extract username from req.params
       excludeFields,(err, user) => res.send(user)
   );
});


module.exports = router;
