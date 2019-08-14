const rootURL = require('../dbRelation/root-db');
const scheduleDB = require('../dbRelation/customer-db');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const Joi = require('@hapi/joi');

mongoose.connect(rootURL.link.url + scheduleDB.custUrl.s_db, { useNewUrlParser: true });

mongoose.connection.on('close', () => console.log('DB Close called'));

mongoose.connection.on('connected', () => console.log('DB Connect called'));

mongoose.connection.on('error', () => console.log('DB Connection error'));

const AssignedUsers = new Schema({
    user: {
        type: String,
        lowercase: true,
        trim: true
    }
});

const TasksSchema = new Schema({
    assigned_users: [AssignedUsers],
    task_title: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        lowercase: true,
        trim: true
    },
    date_start: {
        type: Date,
        default: Date.now
    },
    date_expiration: {
        type: Date
    },
});

const ScheduleSchema = new Schema({
    schedule_owner: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    schedule_title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    tasks: [TasksSchema]
});

ScheduleSchema.methods.joiValidate = function (sched) {
    const schema = Joi.object().keys({
        schedule_owner: Joi.string().required(),
        schedule_title: Joi.string(),
        tasks: Joi.object().keys({
            task_title: Joi.string(),
            description: Joi.string(),
            date_start: Joi.date(),
            date_expiration: Joi.date().greater(Joi.ref('date_start')),
            assigned_users: Joi.object().keys({
                user: Joi.string()
            })
        })
    });

    let retVal = Joi.validate(sched, schema, { abortEarly: false });
    if (retVal.error !== null) {
        if (retVal.error.name === 'ValidationError') return [false, retVal.error];
    } else {
        return [true, 'OK'];
    }

};

const SchedModel = mongoose.model(scheduleDB.custUrl.schedule, ScheduleSchema, scheduleDB.custUrl.schedule);


module.exports = SchedModel;
