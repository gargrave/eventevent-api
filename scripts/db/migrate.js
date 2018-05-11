const knex = require('../../db');
const log = require('../../utils/logger').verboseLog;

const config = {
  directory: './db/migrations/',
  tableName: 'migrations',
};

knex.migrate.latest(config)
  .then(() => {
    log('DB migration successful!');
    process.exit(0);
  })
  .catch((err) => {
    log(['DB migration error!', err]);
    process.exit(1);
  });

