const Boom = require('boom');
const knex = require('../../../../db');

const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');

module.exports = {
  method: 'GET',

  path: apiUrl('/auth/user'),

  handler: async(request, h) => { // eslint-disable-line
    const id = getOwnerId(request);

    // find user in db or error out
    const queryRes = await knex('users').where({ id });
    if (!queryRes.length) {
      const error = Boom.badRequest('Invalid token').output.payload;
      return h.response({ data: { error } }).code(401);
    }

    const [user] = queryRes;
    delete user.password;
    return { data: { user } };
  },

  options: {
    description: 'Auth -> User',
  },
};
