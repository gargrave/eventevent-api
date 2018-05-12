const { deleteQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'DELETE',

  path: apiUrl('/events/{id}'),

  handler: async(request) => {
    const params = { id: request.params.id, table: 'events' };
    const result = await deleteQuery(params);
    const event = result[0];
    return { data: { event } };
  },

  options: {
    description: 'Events -> Delete',
  },
};
