const knex = require('../../../db');
const config = require('../config');

module.exports = {
  method: 'DELETE',
  path: `${config.baseUrl}/events/{id}`,
  handler: async(request) => {
    const result = await knex('events')
      .returning('*')
      .where('id', request.params.id)
      .delete();
    const event = result[0];
    return { data: { event } };
  },
  options: {
    description: 'Event::Detail',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting'],
  },
};
