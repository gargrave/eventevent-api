const knex = require('../../../db');
const config = require('../config');

module.exports = {
  method: 'POST',
  path: `${config.baseUrl}/events`,
  handler: async(request) => {
    const { payload } = request;
    payload.date = new Date();
    const record = await knex('events')
      .returning('*')
      .insert(payload);
    const event = record[0];
    return { data: { event } };
  },
  options: {
    description: 'Event::Create',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting'],
  },
};
