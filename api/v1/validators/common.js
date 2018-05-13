const Joi = require('joi');

const generalSchema = {
  id: Joi.number().integer(),
  owner_id: Joi.number().integer(),
  created_at: Joi.date().iso(),
  updated_at: Joi.date().iso(),
};

module.exports = {
  generalSchema,
};
