const knex = require('../../../db');
const { apiUrl } = require('../config');

module.exports = {
  method: 'GET',
  path: apiUrl('/events'),
  handler: async() => {
    const result = await knex
      .select()
      .from('events');
    return { data: { events: result } };
  },
  options: {
    description: 'Events -> List',
  },
};
