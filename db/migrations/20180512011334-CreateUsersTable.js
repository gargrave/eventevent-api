/* eslint-disable no-unused-vars */
exports.up = (knex, Promise) =>
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.unique('email');
    table.timestamps(true, true);
  });


exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists('users');
