const knex = require('../../../db');

module.exports = async({
  id,
  payload,
  table,
}) =>
  knex(table)
    .returning('*')
    .where('id', id)
    .update(payload);
