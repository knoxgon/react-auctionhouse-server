const express = require('express');
const router = express.Router();
const jwtToken = require('jsonwebtoken');

const userModel = require('../models/user-model');
const secretKey = require('../config').secret.key;

const asyncmw = require('../utils/async-middleware');

const bcrypt = require('bcrypt');

/*
{
        "firstName": "Billy",
        "lastName": "Jones",
        "email": "neutro_patrol@ssu.menningrad.co.uk",
        "username": "aritros200x",
        "password": "deimyaloaritmet4fa7@"
}

*/

router.post('/login', asyncmw(async (req, res) => {
    let username;

    if (req.body.username != null) {
        username = await userModel
            .findOne(
                {
                    $or: [
                        { username: req.body.username },
                        { email: req.body.username }
                    ]
                }
            )
            .exec();
        if (!username) {
            return res.status(400).send({ message: "No such user" })
        }
    }
    if (!bcrypt.compareSync(req.body.password, username.password)) {
        return res.status(400).send({ message: "Wrong password" })
    }
    //Generate and send token within successful logon
    const token = jwtToken.sign(
        { user: username.username, isAdmin: username.isAdmin },
        secretKey,
        { expiresIn: '1h' });

    res.status(200).json({ token: token });
}));

module.exports = router;
