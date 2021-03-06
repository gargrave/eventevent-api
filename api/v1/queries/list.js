const knex = require('../../../db');

module.exports = async({
  orderBy = 'created_at',
  orderByDir = 'asc',
  ownerId,
  select = '*',
  table,
  where,
}) =>
  knex
    .select(select)
    .from(table)
    .where(where || { owner_id: ownerId })
    .orderBy(orderBy, orderByDir);
