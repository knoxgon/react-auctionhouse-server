const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');
const excludeFields = { password: 0, _id: 0, __v: 0 };

const asyncmw = require('../utils/async-middleware');

let verifier = require('../auth/jwtVerifier');

/*We want to extract everything but password, id, and version*/
router.get('/users', verifier, asyncmw(async (req, res, next) => {
    await userModel.find({}, excludeFields, (err, result) => {
        if (err) res.json(err.message);
        res.json(result);
    });
}));


//Find user based on the username or email;
router.get('/users/:username', verifier, asyncmw(async (req, res, next) => {
    if (req.params.username) {
        await userModel.findOne(
            { $or: [{ email: req.params.username }, { username: req.params.username }] }, //Extract email from req.params
            excludeFields, (err, fin) => {
                if (!fin) return res.status(404).send({ "failure": "User not exists." });
                return res.json(fin);
            });
    }
}));

//Delete user based on username or email
router.delete('/users/:username', verifier, asyncmw(async (req, res) => {
    await userModel.deleteOne({ $or: [{ username: req.params.username }, { email: req.params.username }] }, (err, user) => {
        if (!err) {
            if (user.n == 0 && user.ok == 1 && user.deletedCount == 0) {
                return res.status(404).send({ message: 'No such user.' });
            }
            else {
                return res.status(200).send({ message: 'Success' });
            }
        }
        else
            res.status(500).send('Internal Error');
    });
}));


module.exports = router;
