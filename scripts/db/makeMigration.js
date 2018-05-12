const fs = require('fs');
const log = require('../../utils/logger').verboseLog;

const contents =
`/* eslint-disable no-unused-vars */
exports.up = (knex, Promise) => {
};

exports.down = (knex, Promise) => {
};
`;

const name = process.argv[2];
if (name) {
  const dateStr = (new Date()).toISOString().replace(/[-TZ:.]/g, '').slice(0, 14);
  const fileName = `./db/migrations/${dateStr}-${name}.js`;
  fs.writeFile(fileName, contents, (err) => {
    if (err) {
      throw err;
    }
  });
} else {
  log('No file name provided. No migrations will be written!');
}
