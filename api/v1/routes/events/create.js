const { apiUrl } = require('../../config');
const { populateOwnerId, validateOrDie } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { createQuery, parseQueryResult } = require('../../queries');
const { isValidPayload } = require('../../validators/events');

module.exports = {
  method: 'POST',

  path: apiUrl('/events'),

  handler: async(request, h) => {
    const { payload } = request;
    const val = validateOrDie({ h, payload, validator: isValidPayload });
    if (val) {
      return val;
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
