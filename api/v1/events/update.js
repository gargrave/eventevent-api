const knex = require('../../../db');
const { apiUrl } = require('../config');

module.exports = {
  method: ['PUT', 'PATCH'],
  path: apiUrl('/events/{id}'),
  handler: async(request) => {
    const { payload } = request;
    const result = await knex('events')
      .returning('*')
      .where('id', request.params.id)
      .update(payload);
    const event = result[0];
    return { data: { event } };
  },
  options: {
    description: 'Events -> Update',
  },
};
