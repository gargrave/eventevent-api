const faker = require('faker'); // eslint-disable-line

const { getHostableUserId } = require('./auth');

const randomEvents = (titleGen, len = 20) =>
  Array(len).fill(0).map(() => ({
    owner_id: getHostableUserId(),
    title: titleGen(),
    date: faker.date.future(),
  }));

const data = [
  ...randomEvents(faker.company.catchPhrase, 20),
  ...randomEvents(faker.lorem.sentence, 20),
];

const safeEventId = () =>
  Math.max(1, Math.floor(Math.random() * data.length));

module.exports = {
  data,

  getRandomEventId: safeEventId,

  randomLoremEvent: () =>
    randomEvents(faker.lorem.sentence, 1)[0],
};
