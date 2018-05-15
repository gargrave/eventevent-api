const { apiUrl } = require('../../config');
const { getOwnerId } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { detailQuery, parseQueryResult } = require('../../queries');

module.exports = {
  method: 'GET',

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const params = {
      id: request.params.id,
      ownerId: getOwnerId(request),
      select: eventsSelectFields,
      table: 'events',
    };
    const queryResult = await detailQuery(params);
    return parseQueryResult(h, queryResult, 'event');
  },

  options: {
    description: 'Events -> Detail',
  },
};
