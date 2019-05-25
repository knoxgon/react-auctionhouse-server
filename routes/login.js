const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    try {
        let username;
        if(req.body.username != null) {
            username = await userModel
                .findOne(
                    {$or: [
                        {username: req.body.username},
                        {email: req.body.username}
                    ]}
                ).exec();
            if(!username){
                return res.status(400).send({message: "No such user"})
            }
        }
        if(!bcrypt.compareSync(req.body.password, username.password)) {
            return res.status(400).send({message: "Wrong password"})
        }
        res.send({message: "Success"});
    }catch (e) {
        res.send({message: "Internal Server Error"});
    }
});

module.exports = router;
