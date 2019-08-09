const express = require('express');
const router = express.Router();

const scheduleModel = require('../models/schedule-model');
const asyncmw = require('../utils/async-middleware');
let verifier = require('../auth/jwtVerifier');

/*
    JSON Example

    {
	"isAdmin": true,
	"schedule_owner": "whoiam",
	"affected_user": {
		"username": "target_user",
		"task": [
				{
					"task_title": "notitle",
					"description": "make sales complete",
					"date_start": "2019-05-30",
					"date_expiration": "2019-06-10"
				},
				{
					"task_title": "any title",
					"description": "test things",
					"date_start": "2019-07-15",
					"date_expiration": "2019-07-16"
				}
			]
	}
}

*/

router.post('/schedule', verifier, asyncmw(async (req, res, next) => {
    //If schedule owner is making changes for others
    const schedule_owner = req.decoded.user;
    const target_user = req.body.affected_user.username

    if (target_user !== schedule_owner) {
        //It must be an admin
        if (req.decoded.isAdmin) {
            req.body.isAdmin = req.decoded.isAdmin;
            req.body.schedule_owner = req.decoded.user;
            let schedule = new scheduleModel(req.body);
            await schedule.save()
                .then(() => {
                    res.sendStatus(201);
                }).catch((err) => {
                    res.status(400).send(err.message);
                });
        } else {
            return res.status(401).send({ message: 'Only admins are allowed to make schedule changes for others.' });
        }
    } else {
        req.body.isAdmin = req.decoded.isAdmin;
        req.body.schedule_owner = req.decoded.user;
        let schedule = new scheduleModel(req.body);
        await schedule.save()
            .then(() => {
                res.sendStatus(201);
            }).catch((err) => {
                res.status(400).send(err.message);
            });
    }
}));

module.exports = router;