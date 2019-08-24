const rootURL = require('../dbRelation/root-db');
const custDB = require('../dbRelation/customer-db');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const Joi = require('@hapi/joi');

mongoose.createConnection(rootURL.link.url + custDB.custUrl.s_db, { useNewUrlParser: true });

mongoose.connection.on('close', () => console.log('DB Close called'));

mongoose.connection.on('connected', () => console.log('DB Connect called'));

mongoose.connection.on('error', () => console.log('DB Connection error'));

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 16,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 150,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    coc: {
        type: String,
        required: true
    }
});

UserSchema.methods.joiValidate = function (user) {
    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(6).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        coc: Joi.string().valid('client', 'company').required()
    });

    let retVal = Joi.validate(user, schema, { abortEarly: false });
    if (retVal.error !== null) {
        if (retVal.error.name === 'ValidationError') return [false, retVal.error];
    } else
        return [true, 'OK'];

};

const UserModel = mongoose.model(custDB.custUrl.user, UserSchema, custDB.custUrl.user);



module.exports = UserModel;
