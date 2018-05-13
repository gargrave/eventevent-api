const bcrypt = require('bcryptjs');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const knex = require('../../../../db');

const { apiUrl } = require('../../config');
const { validateOrDie } = require('../../helpers');
const { invalidLogin } = require('../../errors');
const { isValidLoginPayload } = require('../../validators/auth');

function buildJWT(user) {
  const { id, email } = user;
  const jwtData = { id, email };
  const duration = Number(process.env.JWT_DEFAULT_DURATION) || (60 * 60);
  const jwtOptions = { expiresIn: duration };
  const token = JWT.sign(jwtData, process.env.AUTH_SECRET_KEY, jwtOptions);
  return token;
}

module.exports = {
  method: 'POST',

  path: apiUrl('/auth/login'),

  handler: async(request, h) => {
    const { payload } = request;
    const validationPayload = { h, payload, validator: isValidLoginPayload };
    const val = validateOrDie(validationPayload);
    if (val) {
      return val;
    }

    // find user in db or error out
    const queryRes = await knex('users')
      .where({ email: payload.email });
    if (!queryRes.length) {
      const error = Boom.notFound(`No user found with email: ${payload.email}.`).output.payload;
      return { data: { error } };
    }

    // confirm password matches or error out
    const [user] = queryRes;
    const match = bcrypt.compareSync(payload.password, user.password);
    if (!match) {
      const error = Boom.unauthorized(invalidLogin()).output.payload;
      return { data: { error } };
    }

    delete user.password; // make sure we do not send password in response
    user.token = buildJWT(user);
    return h.response({ data: { user } }).code(200);
  },

  options: {
    description: 'Auth -> Sign Up',
  },
};
