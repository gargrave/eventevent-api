const Boom = require('boom');

module.exports = {
  validateOrDie({
    h,
    payload,
    validator,
  }) {
    const validation = validator(payload);
    if (validation.error) {
      return h.response({
        data: {
          error: Boom.badRequest(validation.error).output.payload,
        },
      }).code(400);
    }
    return null;
  },
};
