const express = require('express');
const router = express.Router();

const userModel = require('../models/register-user');

router.get('/users', (req, res) => {
    res.send({TYPE: 'GET'});
});

//Create user based on Joi Validator
router.post('/users', (req, res) => {
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
            newList.push(JSON.stringify({errorMessage : arrs[i]}).replace(/[\\'"]+/g, ''));
        }
        res.status(400).send(newList);
    }
});


module.exports = router;

