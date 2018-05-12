const knex = require('../../../../db');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'GET',
  path: apiUrl('/events/{id}'),
  handler: async(request) => {
    const result = await knex('events')
      .where('id', request.params.id);
    const event = result[0];
    return { data: { event } };
  },
  options: {
    description: 'Events -> Detail',
  },
};
