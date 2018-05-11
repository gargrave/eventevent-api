module.exports = {
  method: 'GET',
  path: '/hello',
  handler: (request, h) => (
    { data: { message: 'hello world' } }
  ),
  options: {
    description: 'Say hello!',
    notes: 'The user parameter defaults to \'stranger\' if unspecified',
    tags: ['api', 'greeting'],
  },
};
