const Boom = require('boom');

const knex = require('../../../db');

module.exports = async({
  id,
  payload,
  table,
}) => {
  const res = { error: null, record: null };
  try {
    const queryRes = await knex(table)
      .returning('*')
      .where('id', id)
      .update(payload);
    res.record = queryRes[0]; // eslint-disable-line
  } catch (err) {
    res.error = Boom.badRequest().output.payload;
  }

  return res;
};

