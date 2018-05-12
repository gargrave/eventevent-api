const { apiUrl } = require('../../config');

module.exports = {
  method: 'POST',

  path: apiUrl('/auth/signup'),

  handler: async() => ({ data: 'You have reached the sign up route!' }),

  options: {
    description: 'Auth -> Sign Up',
  },
};
