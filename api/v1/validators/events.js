const Joi = require('joi');

const schema = {
  id: Joi.number().integer(),
  title: Joi.string().min(1).max(255).required(),
  date: Joi.date().iso().required(),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso(),
};

module.exports = {
  isValid: (event, cb) => Joi.validate(event, schema, cb),
};
