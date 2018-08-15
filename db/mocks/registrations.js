const { getRegisterableUserId } = require('./auth');
const { getRandomEventId } = require('./events');

const MOCK_COUNT = 25;

const makeReg = () => ({
  user_id: getRegisterableUserId(),
  event_id: getRandomEventId(),
});

// just an internal helper to check if we have created a dupe
const exists = (mocks, newReg) => mocks.find(
  mock =>
    mock.user_id === newReg.user_id
    && mock.event_id === newReg.event_id,
);

const data = Array(MOCK_COUNT).fill(0).reduce((mocks) => {
  let reg = {};
  while (!reg.user_id || exists(mocks, reg)) {
    reg = makeReg();
  }
  return mocks.concat(reg);
}, []);

module.exports = {
  data,
};
