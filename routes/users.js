const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const excludeFields = { password: 0, _id: 0, __v: 0 };

const asyncmw = require('../utils/async-middleware');

let verifier = require('../auth/jwtVerifier');

/*We want to extract everything but password, id, and version*/
router.get('/users', verifier, asyncmw (async (req, res, next) => {
    const um = await userModel.find({}, excludeFields);

    res.json(um);
}));


//Find user based on the username;
router.get('/users/:username', verifier, asyncmw(async (req, res, next) => {
    const um = await userModel.find(
        { username: req.params.username }, //Extract username from req.params
        excludeFields);

    return res.json(um);
}));

//Delete user based on username
router.delete('/users/:username', verifier, asyncmw (async (req, res) => {
    await userModel.deleteOne({ username: req.params.username }, (err, user) => {
        if (!err) {
            if (user.n == 0 && user.ok == 1 && user.deletedCount == 0) {
                console.log('No Such User: ' + user.n + " : " + user.ok + " : " + user.deletedCount);
                return res.status(400).send({ message: 'Failure' });
            }
            else {
                console.log('User deleted: ' + user.n + " : " + user.ok + " : " + user.deletedCount);
                return res.status(200).send({ message: 'Success' });
            }
        }
        else
            res.status(500).send('Internal Error');
    });

}));


module.exports = router;
