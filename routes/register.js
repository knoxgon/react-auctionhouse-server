const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

const bcrypt = require('bcrypt');

//Create user based on Joi Validator
router.post('/register', (req, res) => {
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

module.exports = router;
