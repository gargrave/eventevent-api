/*
A helper file to reset the databse by dropping ALL existing tables.
Note that this is set to only be allowed to run in a test environment--for obvious reasons.
*/
const env = require('../../env'); // eslint-disable-line
const knex = require('../../db');
const tables = require('../../db/tables');
const { verboseLog } = require('../../utils/logger');

if (process.env.NODE_ENV === 'test') {
  // for (const table in tablse) {
  //   allTables.push(tablse[table]);
  // }
  const allTables = Object.keys(tables).map(key => tables[key]);
  const dropQuery = `DROP TABLE IF EXISTS migrations, migrations_lock, ${allTables.join(', ')};`;
  verboseLog('Dropping all tables to reset DB for tests...');

  knex.schema.raw(dropQuery)
    .then(() => {
      verboseLog('DB reset successful!');
      process.exit(0);
    }, (err) => {
      verboseLog('DB reset error!');
      verboseLog(err);
      process.exit(1);
    });
}
