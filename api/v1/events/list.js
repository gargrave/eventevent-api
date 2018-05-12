const knex = require('../../../db');
const config = require('../config');

module.exports = {
  method: 'GET',
  path: `${config.baseUrl}/events`,
  handler: async() => {
    const result = await knex
      .select()
      .from('events');
    return { data: { events: result } };
  },
  options: {
    description: 'Events::Index',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting'],
  },
};
