const { deleteQuery } = require('../../queries');
const { apiUrl } = require('../../config');

module.exports = {
  method: 'DELETE',

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const params = { id: request.params.id, table: 'events' };
    const queryResult = await deleteQuery(params);
    const { record, error } = queryResult;
    const response = error ? { error } : { event: record };
    const code = error ? error.statusCode : 200;
    return h.response({ data: response }).code(code);
  },

  options: {
    description: 'Events -> Delete',
  },
};
