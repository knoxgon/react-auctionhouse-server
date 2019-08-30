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

const ClientSchema = new Schema({
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
        maxLength: 30,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    birthdate: {
        type: Date,
        required: true
    }
});

ClientSchema.methods.joiValidate = function (client) {
    const schema = Joi.object().keys({
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(30).required(),
      username: Joi.string().min(6).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      birthdate: Joi.date().required()
    });

    let retVal = Joi.validate(client, schema, { abortEarly: false });
    if (retVal.error !== null) {
        if (retVal.error.name === 'ValidationError') return [false, retVal.error];
    } else
        return [true, 'OK'];

};

const ClientModel = mongoose.model(custDB.custUrl.client, ClientSchema, custDB.custUrl.client);



module.exports = ClientModel;
