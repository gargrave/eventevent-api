const Boom = require('boom');
const JWT = require('jsonwebtoken');

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

  getOwnerId(request) {
    const decoded = JWT.verify(
      request.headers.authorization,
      process.env.AUTH_SECRET_KEY,
    );
    return decoded.id;
  },

  populateOwnerId(request) {
    const decoded = JWT.verify(
      request.headers.authorization,
      process.env.AUTH_SECRET_KEY,
    );
    request.payload.owner_id = decoded.id;
    return decoded.id;
  },
};
