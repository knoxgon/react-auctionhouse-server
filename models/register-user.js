const rootURL = require('../dbRelation/root-db');
const custDB = require('../dbRelation/customer-db');

const mongoose = require('mongoose'),
                 Schema = mongoose.Schema,
                 bcrypt = require('bcrypt'),
                 SALT_WORK_FACTOR = 10;

const Joi = require('@hapi/joi');

mongoose.connect(rootURL.link.url + custDB.custUrl.s_db)
    .catch((err) => console.log('DB error'))
    .then((res) => console.log('Connection OK'));

const UserSchema = new Schema( {
    isAdmin: {
        type: Boolean,
        required: true
    },
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
        maxLength: 16
    },
    email: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 150,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 24
    }
});

UserSchema.methods.joiValidate = function(user){
    const schema = Joi.object().keys({
        isAdmin: Joi.boolean().required(),
        firstName: Joi.string().min(3).max(20).required(),
        lastName: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(6).max(16).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(24).required(),
    });

    let retVal = Joi.validate(user, schema, { abortEarly: false });
    if(retVal.error !== null){
        if(retVal.error.name === 'ValidationError') return [false, retVal.error];
    }else
        return [true, 'OK'];

};

const UserModel = mongoose.model(custDB.custUrl.user, UserSchema, custDB.custUrl.user);

module.exports = UserModel;
