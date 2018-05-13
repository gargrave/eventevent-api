const knex = require('../../../db');

module.exports = async({
  ownerId,
  table,
}) =>
  knex
    .select()
    .where({ owner_id: ownerId })
    .from(table);
