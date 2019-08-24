const rootURL = require('../dbRelation/root-db');
const cliDB = require('../dbRelation/input-db');
const custDB = require('../dbRelation/customer-db');
const Joi = require('@hapi/joi');

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

mongoose.connect(rootURL.link.url + custDB.custUrl.s_db, { useNewUrlParser: true });

mongoose.connection.on('close', () => console.log('DB Close called'));

mongoose.connection.on('connected', () => console.log('DB Connect called'));

mongoose.connection.on('error', () => console.log('DB Connection error'));

const ClientInputSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  terms: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

ClientInputSchema.methods.joiValidate = function (inputs) {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    productName: Joi.string().required(),
    branch: Joi.string().required(),
    terms: Joi.string().required(),
    amount: Joi.number().required()
  });

  let retVal = Joi.validate(inputs, schema, { abortEarly: false });
  if (retVal.error !== null) {
    if (retVal.error.name === 'ValidationError') return [false, retVal.error];
  } else
    return [true, 'OK'];
};

const ClientInputModel = mongoose.model(cliDB.inputUrl.clientInput, ClientInputSchema, cliDB.inputUrl.clientInput);

module.exports = ClientInputModel;
