const Joi = require('joi');

const { generalSchema } = require('./common');

const payloadSchema = {
  title: Joi.string().min(1).max(255).required(),
  date: Joi.date().iso().required(),
};

const combined = { ...generalSchema, ...payloadSchema };

module.exports = {
  isValid: (event, cb) => Joi.validate(event, combined, cb),
  isValidPayload: event => Joi.validate(event, payloadSchema),
  isValidUpdatePayload: event => Joi.validate(event, combined),
};
