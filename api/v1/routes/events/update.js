const { updateQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: ['PUT', 'PATCH'],

  path: apiUrl('/events/{id}'),

  handler: async(request) => {
    const { payload } = request;
    const params = { id: request.params.id, payload, table: 'events' };
    const result = await updateQuery(params);
    const event = result[0];
    return { data: { event } };
  },

  options: {
    description: 'Events -> Update',
  },
};
