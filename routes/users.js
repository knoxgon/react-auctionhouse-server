const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const secKey = require('../config').secret.key;

const excludeFields = { password: 0, _id: 0, __v: 0 };

let verifier = require('../auth/jwtVerifier');

/*We want to extract everything but password, id, and version*/
router.get('/users', verifier, (req, res) => {
    userModel.find({}, excludeFields, (err, users) => res.send(users));
});


//Find user based on the username;
router.get('/users/:username', verifier, (req, res) => {
    userModel.find(
        { username: req.params.username }, //Extract username from req.params
        excludeFields, (err, user) => res.send(user)
    );
});


//Delete user based on username
router.delete('/users/:username', verifier, (req, res) => {
    userModel.deleteOne({ username: req.params.username }, (err, user) => {
        if (!err) {
            if (user.n == 0 && user.ok == 1 && user.deletedCount == 0) {
                console.log('No Such User: ' + user.n + " : " + user.ok + " : " + user.deletedCount);
                return res.status(200).send({ message: 'Failure' });
            }
            else {
                console.log('User deleted: ' + user.n + " : " + user.ok + " : " + user.deletedCount);
                return res.status(400).send({ message: 'Success' });
            }
        }
        else
            res.status(500).send('Internal Error');
    }).exec();
})


module.exports = router;
