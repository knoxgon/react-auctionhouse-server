const express = require('express');
const router = express.Router();
const jwtToken = require('jsonwebtoken');

const userModel = require('../models/user-model');
const secretKey = require('../config').secret.key;

const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
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
                ).exec();
            if (!username) {
                return res.status(400).send({ message: "No such user" })
            }
        }
        if (!bcrypt.compareSync(req.body.password, username.password)) {
            return res.status(400).send({ message: "Wrong password" })
        }
        //Generate and send token within successful logon
        const token = jwtToken.sign(
            { user: username.username },
            secretKey,
            { expiresIn: '1h' });
        console.log(username.username);
        globalusername = username.username;
        res.json({ token: token });
    } catch (e) {
        res.send({ message: e.message });
    }
});

module.exports = router;
