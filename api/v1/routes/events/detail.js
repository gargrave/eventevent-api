const { detailQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'GET',

  path: apiUrl('/events/{id}'),

  handler: async(request) => {
    const params = { id: request.params.id, table: 'events' };
    const result = await detailQuery(params);
    const event = result[0];
    return { data: { event } };
  },

  options: {
    description: 'Events -> Detail',
  },
};
