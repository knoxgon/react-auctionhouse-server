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

const TaskSchema = new Schema({
    task_title: {
        type: String,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    date_start: {
        type: Date,
        required: true,
        default: Date.now
    },
    date_expiration: {
        type: Date
    }
});

const AffectedUser = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    task: [TaskSchema]
});

const ScheduleSchema = new Schema({
    isAdmin: {
        type: Boolean,
        required: true
    },
    schedule_owner: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    affected_user: {
        type: AffectedUser,
        required: true
    }
});

ScheduleSchema.methods.joiValidate = function (user) {
    const schema = Joi.object().keys({
        isAdmin: Joi.boolean().required(),
        schedule_owner: Joi.string().required(),
        affected_user: Joi.object().key
    });

    let retVal = Joi.validate(user, schema, { abortEarly: false });
    if (retVal.error !== null) {
        if (retVal.error.name === 'ValidationError') return [false, retVal.error];
    } else
        return [true, 'OK'];

};

const SchedModel = mongoose.model(scheduleDB.custUrl.schedule, ScheduleSchema, scheduleDB.custUrl.schedule);

module.exports = SchedModel;