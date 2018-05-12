const knex = require('../../../db');
const { apiUrl } = require('../config');

module.exports = {
  method: 'POST',
  path: apiUrl('/events'),
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
    description: 'Events -> Create',
  },
};
