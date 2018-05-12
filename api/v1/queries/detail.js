const Boom = require('boom');
const knex = require('../../../db');

module.exports = async({
  id,
  table,
}) => {
  const res = { error: null, record: null };
  const queryRes = await knex(table)
    .where('id', id);

  if (queryRes.length) {
    res.record = queryRes[0]; // eslint-disable-line
  } else {
    res.error = Boom.badRequest('No matching object found.').output.payload;
  }

  return res;
};
