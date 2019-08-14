const express = require('express');
const router = express.Router();

const scheduleModel = require('../models/schedule-model');
const asyncmw = require('../utils/async-middleware');
let verifier = require('../auth/jwtVerifier');

/*
    JSON Example

    //schedule_title && schedule_owner combination unique
    {
    "schedule_title": "My company schedule",
    "tasks":
        {
            "assigned_users": [
                {
                    "user": "aUserName"
                },
                {
                    "user": "myname"
                }
            ],
            "task_title": "notitle",
            "description": "make sales complete",
            "date_start": "2019-05-30",
            "date_expiration": "2019-06-10"
        }
}
}

*/

//Get all schedules
router.get('/schedules', verifier, asyncmw(async (req, res, next) => {
  //Get all schedules for the current user
  const user = req.decoded.user;
  await scheduleModel.find({ schedule_owner: user },
    { _id: 0, __v: 0, "affected_user._id": 0, "affected_user.task._id": 0 },
    (err, doc) => {
      res.status(200).send(doc);
    })
}));

/*
{
	"schedule_title": "my random title_1"
}
*/
router.post('/schedule/add', verifier, asyncmw(async (req, res, next) => {
  req.body.tasks = [];
  let schedule_title = req.body.schedule_title;
  let schedule_owner = req.body.schedule_owner = req.decoded.user;

  if (!schedule_title) {
    return res.status(400).send('Schedule title must be provided.')
  }

  let schedule = new scheduleModel(req.body);

  await scheduleModel
    .findOne(
      {
        $and: [
          { schedule_title: schedule_title },
          { schedule_owner: schedule_owner }]
      }, (err, result) => {
        if (err) {
          res.status(500).send('Internal Error');
        }
        if (!result) {
          schedule.save().then((doc) => {
            res.status(201).send('Table created.');
          });
        }
        else {
          res.status(412).send('A table with that name exists. Pick a new name.');
        }
      });
}));

/*
"tasks":
        {
            "task_title": "jack's duties",
            "description": "clean up your desk and make coffee",
            "date_start": "2020-02-26",
            "date_expiration": "2020-02-27"
        },
        {
            "task_title": "zodiac",
            "description": "complete sales",
            "date_start": "2021-05-15",
            "date_expiration": "2021-07-22"
        }

*/

router.post('/schedule/add/task', verifier, asyncmw(async (req, res, next) => {
  let schedule_title = req.body.schedule_title;
  let schedule_owner = req.body.schedule_owner = req.decoded.user;

  if (!schedule_title) {
    return res.status(400).send('Schedule title must be provided.')
  }

  await scheduleModel
    .updateOne(
      {
        $and: [
          { schedule_title: schedule_title },
          { schedule_owner: schedule_owner }],
      }, {
        $addToSet: {
          "tasks": {
            task_title: req.body.tasks.task_title,
            description: req.body.tasks.description,
            date_start: req.body.tasks.date_start,
            date_expiration: req.body.tasks.date_expiration
          }
        }
      })
    .exec((err, story) => {
      if (err) return res.send(err);
      res.status(200).send(story);
    });
}));

router.post('/schedule/add/user', verifier, asyncmw(async (req, res, next) => {
  const schedule_owner = req.decoded.user;
  const schedule_title = req.body.schedule_title;


  await scheduleModel.updateOne({
    $and: [
      { schedule_title: schedule_title },
      { schedule_owner: schedule_owner },
      {
        tasks: {
          $elemMatch: {
            "task_title": req.body.tasks.task_title
          }
        }
      }
    ]
  }, {
      $addToSet: {
        "tasks.$.assigned_users": req.body.tasks.assigned_users
      }
    },
    (err, doc) => {
      if (err) return res.send(err)
      res.send(doc)
    })
}));

module.exports = router;