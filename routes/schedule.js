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
    const isAdmin = req.body.isAdmin;
    const owner = req.body.schedule_owner;
    const target_user = req.body.affected_user.username;
    for (let task in req.body.affected_user.task) {
        console.log(req.body.affected_user.task[task].task_title);
        console.log(req.body.affected_user.task[task].description);
        console.log(req.body.affected_user.task[task].date_start);
        console.log(req.body.affected_user.task[task].date_expiration);
    }
}));

module.exports = router;