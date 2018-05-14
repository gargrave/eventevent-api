const Boom = require('boom');
const JWT = require('jsonwebtoken');

function decodeJWT(request) {
  return JWT.verify(
    request.headers.authorization,
    process.env.AUTH_SECRET_KEY,
  );
}

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

  getOwnerId: request => decodeJWT(request).id,

  populateOwnerId(request) {
    const decoded = decodeJWT(request);
    request.payload.owner_id = decoded.id;
    return decoded.id;
  },
};
