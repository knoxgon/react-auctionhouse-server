const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

const bcrypt = require('bcrypt');

const excludeFields = {password: 0, _id: 0, __v: 0};

//Create user based on Joi Validator
router.post('/users', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let user = new userModel(req.body);
    let userResult = user.joiValidate(req.body);
    if(userResult[0]){
        user.save().then(item => {
            res.sendStatus(201);
        }).catch((err) => res.status(400).send(err.errmsg));
    } else {
        let arrs = userResult[1].message.split('. ');
        let newList = [];
        for(var i = 0; i < arrs.length; i++){
            newList.push(JSON.stringify(
                {errorMessage : arrs[i]})
                .replace(/[\\'"]+/g, ''));
        }
        res.status(400).send(newList);
    }
});

router.get('/users', (req, res) => {
/*We want to extract everything but password, id, and version*/
    userModel.find({}, excludeFields, (err, users) => res.send(users));
});


//Find user based on the username;
router.get('/users/:username', (req, res) => {
   userModel.find(
       {username: req.params.username}, //Extract username from req.params
       excludeFields,(err, user) => res.send(user)
   );
});

//Change password

module.exports = router;
