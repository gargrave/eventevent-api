const Boom = require('boom');
const JWT = require('jsonwebtoken');

const knex = require('../../../db');

function decodeJWT(request) {
  return JWT.verify(
    request.headers.authorization,
    process.env.AUTH_SECRET_KEY,
  );
}

module.exports = {
  /**
   * Validates the current request payload with the provided Joi validation function.
   * Returns a Boom error if errors are found; otherwise returns null.
   * @param {*} h HapiJS response "h" object
   * @param {*} payload The request payload to validate
   * @param {*} validator The Joi validation function to use against the payload
   */
  validateOrDie({ h, payload, validator }) {
    const validation = validator(payload);
    if (validation.error) {
      return h.response({
        data: { error: Boom.badRequest(validation.error).output.payload },
      }).code(400);
    }
    return null;
  },

  /**
   * Returns the owner ID of the currently authenticated user
   * @param {*} request HapiJS request object
   */
  getOwnerId: request => decodeJWT(request).id,

  /**
   * Adds the owner ID of the currently authenticated user to the request payload
   * @param {*} request HapiJS request object
   */
  populateOwnerId(request) {
    const decoded = decodeJWT(request);
    request.payload.owner_id = decoded.id;
    return decoded.id;
  },

  /**
   * Updates the 'updated_at' field on the provided payload to NOW.
   */
  setUpdatedAt: payload => ({ ...payload, updated_at: knex.raw('NOW()') }),
};

