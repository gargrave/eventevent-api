const { apiUrl } = require('../../config');
const { getOwnerId, validateOrDie } = require('../../helpers/common');
const { eventsSelectFields } = require('../../helpers/events');
const { detailQuery, parseQueryResult, updateQuery } = require('../../queries');
const { isValidUpdatePayload } = require('../../validators/events');

async function getOriginalRecord(request) {
  const ownerId = getOwnerId(request);
  const getParams = {
    id: request.params.id,
    ownerId,
    table: 'events',
  };
  const getQueryResult = await detailQuery(getParams);
  return getQueryResult.record;
}

module.exports = {
  method: ['PUT', 'PATCH'],

  path: apiUrl('/events/{id}'),

  handler: async(request, h) => {
    const originalRecord = await getOriginalRecord(request);
    const { payload } = request;
    const val = validateOrDie({
      h,
      payload: { ...originalRecord, ...payload },
      validator: isValidUpdatePayload,
    });
    if (val) {
      return val;
    }

    // TODO: need to update the 'updated_at' field to NOW()
    const params = {
      id: request.params.id,
      ownerId: getOwnerId(request),
      payload,
      returning: eventsSelectFields,
      table: 'events',
    };
    const queryResult = await updateQuery(params);
    return parseQueryResult(h, queryResult, 'event');
  },

  options: {
    description: 'Events -> Update',
  },
};
