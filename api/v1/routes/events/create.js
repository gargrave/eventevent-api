const Boom = require('boom');

const { apiUrl } = require('../../config');
const { populateOwnerId } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { createQuery, parseQueryResult } = require('../../queries');
const { isValidPayload } = require('../../validators/events');

module.exports = {
  method: 'POST',

  path: apiUrl('/events'),

  handler: async(request, h) => {
    const { payload } = request;
    // TODO: write a wrapper for these repetive validation calls
    const validation = isValidPayload(payload);
    if (validation.error) {
      return h.response({
        data: {
          error: Boom.badRequest(validation.error).output.payload,
        },
      }).code(400);
    }

    const params = {
      payload,
      returning: eventsSelectFields,
      table: 'events',
    };
    const queryResult = await createQuery(params);
    return parseQueryResult(h, queryResult, 'event', 201);
  },

  options: {
    description: 'Events -> Create',
    pre: [
      { method: populateOwnerId, failAction: 'error' },
    ],
  },
};
