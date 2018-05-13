const { data } = require('../mocks/events');

const table = 'events';
const SQL_REST = `ALTER SEQUENCE "${table}_id_seq" RESTART WITH 1; UPDATE "${table}" SET id = DEFAULT;`;

exports.seed = (Knex, Promise) =>
  new Promise(
    resolve => Knex(table).del().then(
      () => Knex.raw(SQL_REST).then(
        () => Knex(table)
          .insert(data)
          .then(resolve)
      )
    )
  );
