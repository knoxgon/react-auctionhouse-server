const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const usernameCheck = require('../utils/validator');

const bcrypt = require('bcrypt');

const asyncmw = require('../utils/async-middleware');

/*
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john_doe@hotmail.com",
        "username": "jd_95",
        "password": "#@589142fa9",
        "coc": "client"
    }
    {
        "firstName": "Uthas",
        "lastName": "Wilson",
        "email": "uw@gmail.com",
        "username": "utwill",
        "password": "%)kda753z7,
        "coc": "company"
    }
*/

//Create user based on Joi Validator
router.post('/register', asyncmw(async (req, res, next) => {
    //Validate username
    let result = usernameCheck.validateUsername(req.body.username);
    //Validate password
    if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password length must be 8 or more characters' });
    }
    if (result) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let user = new userModel(req.body);
        //Validate credentials
        let userResult = user.joiValidate(req.body);
        if (userResult[0]) {
            await user.save().then(item => {
                res.sendStatus(201);
            }).catch((err) => res.status(400).send(err.errmsg));
        } else {
            //Send error list
            let arrs = userResult[1].message.split('. ');
            let newList = [];
            for (var i = 0; i < arrs.length; i++) {
                newList.push(JSON.stringify(
                    { errorMessage: arrs[i] })
                    .replace(/[\\'"]+/g, ''));
            }
            res.status(400).send(newList);
        }
    } else {
        res.status(400).send({ message: 'username cannot contain special characters' });
    }
}));

module.exports = router;
