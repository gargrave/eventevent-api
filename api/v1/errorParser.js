const { verboseLogDev } = require('../../utils/logger');
const { userExists } = require('./errors');

function cleanErrorMessage(err) {
  if (`${err}`.match(/value violates unique constraint/)) {
    if (`${err}`.match(/users_email_unique/)) {
      return userExists();
    }
  }

  verboseLogDev([
    'An unparseable error has occurred:',
    err,
  ]);
  return '';
}

module.exports = {
  cleanErrorMessage,
};
