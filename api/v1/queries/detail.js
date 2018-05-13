const Boom = require('boom');
const knex = require('../../../db');

const { failedToFind } = require('../errors');

module.exports = async({
  id,
  table,
}) => {
  const res = { error: null, record: null };
  const queryRes = await knex(table)
    .where({ id });

  if (queryRes.length) {
    res.record = queryRes[0]; // eslint-disable-line
  } else {
    res.error = Boom.notFound(failedToFind(table, id)).output.payload;
  }

  return res;
};
