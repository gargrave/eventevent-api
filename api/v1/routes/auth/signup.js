const bcrypt = require('bcryptjs');

const { apiUrl } = require('../../config');
const { validateOrDie } = require('../../helpers/common');
const { createQuery } = require('../../queries');
const { isSignupPayloadValid } = require('../../validators/auth');

async function runCreateQuery(h, params, dataName) {
  const queryResult = await createQuery(params);
  const { record, error } = queryResult;
  const response = error ? { error } : { [dataName]: record };
  const code = error ? error.statusCode : 201;
  return h.response({ data: response }).code(code);
}

module.exports = {
  method: 'POST',

  path: apiUrl('/auth/signup'),

  handler: async(request, h) => {
    let { payload } = request;
    const validationPayload = { h, payload, validator: isSignupPayloadValid };
    const val = validateOrDie(validationPayload);
    if (val) {
      return val;
    }

    const hash = bcrypt.hashSync(payload.password, 10);
    payload = { email: payload.email, password: hash };
    const returning = ['id', 'email', 'created_at', 'updated_at'];
    const params = { payload, returning, table: 'users' };

    return runCreateQuery(h, params, 'user');
  },

  options: {
    auth: false,
    description: 'Auth -> Sign Up',
  },
};
