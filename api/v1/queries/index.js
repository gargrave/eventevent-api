const createQuery = require('./create');
const deleteQuery = require('./delete');
const detailQuery = require('./detail');
const listQuery = require('./list');
const updateQuery = require('./update');

function parseQueryResult(h, queryResult, dataName, successCode = 200) {
  const { record, error } = queryResult;
  const response = error ? { error } : { [dataName]: record };
  const code = error ? error.statusCode : successCode;
  return h.response({ data: response }).code(code);
}

module.exports = {
  createQuery,
  deleteQuery,
  detailQuery,
  listQuery,
  parseQueryResult,
  updateQuery,
};
