const knex = require('../../../db');

module.exports = async({
  ownerId,
  select = '*',
  table,
}) =>
  knex
    .select(select)
    .where({ owner_id: ownerId })
    .from(table);
