const knex = require('../../db');
const log = require('../../utils/logger').verboseLog;

const config = {
  directory: './db/migrations/',
  tableName: 'migrations',
};

knex.migrate.rollback(config)
  .then(() => {
    log('DB rollback successful!');
    process.exit(0);
  })
  .catch((err) => {
    log('DB rollback error!');
    log(err);
    process.exit(1);
  });

