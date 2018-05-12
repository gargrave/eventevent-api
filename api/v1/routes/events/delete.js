const knex = require('../../../../db');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'DELETE',
  path: apiUrl('/events/{id}'),
  handler: async(request) => {
    const result = await knex('events')
      .returning('*')
      .where('id', request.params.id)
      .delete();
    const event = result[0];
    return { data: { event } };
  },
  options: {
    description: 'Events -> Delete',
  },
};
