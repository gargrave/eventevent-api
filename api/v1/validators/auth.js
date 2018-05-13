const Joi = require('joi');

const { generalSchema } = require('./common');

const userPayload = {
  email: Joi
    .string()
    .trim()
    .email()
    .required(),
};

const authSchema = {
  email: Joi
    .string()
    .trim()
    .email()
    .required(),

  password: Joi
    .string()
    .trim()
    .regex(/^[\w\d!@#$%^&*_]+$/)
    .min(8)
    .max(72)
    .required()
    .options({
      language: {
        string: {
          regex: { base: 'Password contains illegal characters.' },
        },
      },
    }),
};

const signupSchema = {
  passwordConfirm: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .options({
      language: {
        any: { allowOnly: 'Passwords do not match.' },
      },
    }),
};

module.exports = {
  isValidUser: data => Joi.validate(
    data, { ...generalSchema, ...userPayload }
  ),

  isSignupPayloadValid: data => Joi.validate(
    data, { ...authSchema, ...signupSchema }
  ),
};
