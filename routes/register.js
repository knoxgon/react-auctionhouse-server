const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const usernameCheck = require('../utils/validator');

const bcrypt = require('bcrypt');

const asyncmw = require('../utils/async-middleware');

/*
    {
        "isAdmin": false,
        "firstName": "Recep",
        "lastName": "Guven",
        "email": "recep@hotmail.com",
        "username": "vol123",
        "password": "rec123123"
    }
    {
        "isAdmin": true,
        "firstName": "Recep Rojda",
        "lastName": "Gunduz",
        "email": "volkan@hotmail.com",
        "username": "recvol123",
        "password": "rec123123"
    }
*/

//Create user based on Joi Validator
router.post('/register', asyncmw(async (req, res, next) => {
    //Validate username
    let result = usernameCheck(req.body.username);
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
