const express = require('express');
const router = express.Router();

const userModel = require('../models/user-model');

const bcrypt = require('bcrypt');


router.post('/login', async (req, res) => {
    try {
        let globalAlias;
        if(req.body.username != null) {
            const username = await userModel.findOne({username: req.body.username}).exec();
            globalAlias = username;
            if(!username){
                return res.status(400).send({message: "No such user"})
            }
        }
        if(req.body.email != null){
            const email = await userModel.findOne({email: req.body.email}).exec();
            globalAlias = email;
            if(!email) {
                return res.status(400).send({message: "No such email"})
            }
        }
        if(!bcrypt.compareSync(req.body.password, globalAlias.password)) {
            return res.status(400).send({message: "Wrong password"})
        }
        res.send({message: "Success"});
    }catch (e) {
        res.send({message: e.message});
    }
});

module.exports = router;
