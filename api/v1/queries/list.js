const knex = require('../../../db');

module.exports = async({
  orderBy = 'created_at',
  orderByDir = 'asc',
  ownerId,
  select = '*',
  table,
}) =>
  knex
    .select(select)
    .where({ owner_id: ownerId })
    .from(table)
    .orderBy(orderBy, orderByDir);
