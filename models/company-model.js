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

const CompanySchema = new Schema({
    corporateIdentityNumber: {
        type: String,
        required: true,
        lowercase: true      
    },
    contactFirstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    contactLastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    companyName: {
        type: String,
        required: true,
        lowercase: true,
    },
    companyEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    billingAddress: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    branches: [{
      type: String
    }]
});

CompanySchema.methods.joiValidate = function (company) {
    const schema = Joi.object().keys({
      corporateIdentityNumber: Joi.string().required(),
      companyName: Joi.string().required(),
      contactFirstName: Joi.string().min(2).max(30).required(),
      contactLastName: Joi.string().min(2).max(30).required(),
      companyEmail: Joi.string().email().required(),
      address: Joi.string().required(),
      billingAddress: Joi.string().required(),
      branches: Joi.object().keys({
        branch: Joi.object().valid('kök', 'bygg', 'mat', 'it', 'elektronisk').required()
      }),
      password: Joi.string().required()
    });

    let retVal = Joi.validate(company, schema, { abortEarly: false });
    if (retVal.error !== null) {
        if (retVal.error.name === 'ValidationError') return [false, retVal.error];
    } else
        return [true, 'OK'];

};

const CompanyModel = mongoose.model(custDB.custUrl.company, CompanySchema, custDB.custUrl.company);

module.exports = CompanyModel;
