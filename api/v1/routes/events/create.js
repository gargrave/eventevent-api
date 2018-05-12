const { createQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'POST',

  path: apiUrl('/events'),

  handler: async(request) => {
    const { payload } = request;
    payload.date = new Date();
    const params = { payload, table: 'events' };
    const record = await createQuery(params);
    const event = record[0];
    return { data: { event } };
  },

  options: {
    description: 'Events -> Create',
  },
};
