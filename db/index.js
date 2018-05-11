let knex = require('knex');

if (!knex.insert) {
  knex = knex({
    client: 'pg',
    connection: 'postgresql://localhost/eventevent_dev',
  });
}

module.exports = knex;
