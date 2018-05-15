const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { deleteQuery, parseQueryResult } = require('../../queries');

module.exports = {
  method: 'DELETE',

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const params = {
      id: request.params.id,
      ownerId: getOwnerId(request),
      returning: eventsSelectFields,
      table: 'events',
    };
    const queryResult = await deleteQuery(params);
    return parseQueryResult(h, queryResult, 'event');
  },

  options: {
    description: 'Events -> Delete',
  },
};
