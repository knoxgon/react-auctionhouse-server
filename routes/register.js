const express = require('express');
const router = express.Router();

const clientModel = require('../models/client-model');
const companyModel = require('../models/company-model');

const usernameCheck = require('../utils/validator');

const bcrypt = require('bcrypt');

const asyncmw = require('../utils/async-middleware');

/*
    {
        client: {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john_doe@hotmail.com",
          "username": "jd1995",
          "password": "#@589142fa9",
          "address": "journal avenue 74 CA",
          "birthdate": "1975-05-19"
        }
    },
    {
        company:
        {
          "corporateIdentityNumber": "556342-7391",
          "companyName": "Ängelsbolag AB",
          "address": "Björnkullavägen 75 Huddinge 14379",
          "billingAddress": "Gamla Stan 12b 17452",
          "contactFirstName": "Adam",
          "contactLastName": "Eva",
          "companyEmail": "angels@allabolag.se",
          "password": "weArenotheretoGetAnything58129"
        },
        {
          "corporateIdentityNumber": "581-5871-6",
          "companyName": "Bolärnas Verkstad",
          "address": "Sjödalsvägen 923 16922 Skogås",
          "billingAddress": "Sjödalsvägen 923 16922 Skogås",
          "contactFirstName": "Heidi",
          "contactLastName": "Twinkler",
          "companyEmail": "admin.office@bo.verkstad.com",
          "password": "298@8FAUHJ4Tohrq1"
        }
    }
*/

//Create client based on Joi Validator
router.post('/register/client', asyncmw(async (req, res, next) => {
    //Validate username
    let result = usernameCheck.validateUsername(req.body.username);
    //Validate password
    if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password length must be 8 or more characters' });
    }
    if (result) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        let client = new clientModel(req.body);
        //Validate credentials
        let clientResult = client.joiValidate(req.body);
        if (clientResult[0]) {
            await client.save().then(_ => {
                res.sendStatus(201);
            }).catch((err) => res.status(400).send(err.errmsg));
        } else {
            //Send error list
            let arrs = clientResult[1].message.split('. ');
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

//Create company based on Joi Validator
router.post('/register/company', asyncmw(async (req, res, next) => {
    //Validate password
    if (req.body.password.length < 8) {
        return res.status(400).send({ message: 'Password length must be 8 or more characters' });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let company = new companyModel(req.body);
    //Validate credentials
    let companyResult = company.joiValidate(req.body);
    if (companyResult[0]) {
        await company.save().then(_ => {
            res.sendStatus(201);
        }).catch((err) => res.status(400).send(err.errmsg));
    } else {
        //Send error list
        let arrs = companyResult[1].message.split('. ');
        let newList = [];
        for (var i = 0; i < arrs.length; i++) {
            newList.push(JSON.stringify(
                { errorMessage: arrs[i] })
                .replace(/[\\'"]+/g, ''));
        }
        res.status(400).send(newList);
    }
}));

module.exports = router;
