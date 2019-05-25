const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

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

router.get('/users', (req, res) => {
/*We exclude _id from sending to the client.
Mongo is automatically adding it if not stated otherwise
The password is not within the scope of the parameters
thus no need to include it
We want, isAdmin, firstName, lastName, username, email
to be sent to the client*/
    userModel.find({}, {isAdmin: 1, firstName: 1, lastName: 1, username: 1, email: 1, _id: 0},
        (err, users) => res.send(users));
});


//Find user based on the username;
router.get('/users/:username', (req, res) => {
   userModel.find(
       {username: req.params.username}, //Extract username from req.params
       {isAdmin: 1, firstName: 1, lastName: 1, username: 1, email: 1, _id: 0},
       (err, user) => res.send(user)
   );
});


module.exports = router;
