const Joi = require('joi');

const { generalSchema } = require('./common');

const userSchema = {
  email: Joi
    .string()
    .trim()
    .email()
    .regex(/^\S+@\S+\.\S+$/)
    .required(),

  token: Joi.string().trim(),
};

const authSchema = {
  ...userSchema,
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
  ...authSchema,
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
    data, { ...generalSchema, ...userSchema }
  ),

  isValidLoginPayload: data => Joi.validate(data, authSchema),

  isSignupPayloadValid: data => Joi.validate(data, signupSchema),
};
