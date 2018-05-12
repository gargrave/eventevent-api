const Joi = require('joi');

const signupPayload = {
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
  isSignupPayloadValid: data => Joi.validate(data, signupPayload),
};
