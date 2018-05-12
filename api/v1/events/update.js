const knex = require('../../../db');
const config = require('../config');

module.exports = {
  method: ['PUT', 'PATCH'],
  path: `${config.baseUrl}/events/{id}`,
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
    description: 'Event::Detail',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting'],
  },
};
