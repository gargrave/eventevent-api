const faker = require('faker'); // eslint-disable-line

const randomEvents = (titleGen, len = 20) =>
  Array(len).fill(0).map(() => ({
    title: titleGen(),
    date: faker.date.future(),
  }));

const data = [
  { title: 'Learn to Use Your Dishwasher', date: faker.date.future() },
  { title: 'Basic Personal Hygiene 101', date: faker.date.future() },
  { title: 'LP Youth – Leadership Program for Youth', date: faker.date.future() },
  { title: 'Tall Tales and Nightingales', date: faker.date.future() },
  { title: 'All About Bananas', date: faker.date.future() },
  { title: 'Firefly Friends Children’s Fund', date: faker.date.future() },
  { title: 'Reach For Peace', date: faker.date.future() },
  { title: 'An Arbor Day to Remember', date: faker.date.future() },
  { title: 'Contortionist’s Boot Camp', date: faker.date.future() },
  { title: 'Peace, Love, and Kitty Cats', date: faker.date.future() },
  ...randomEvents(faker.company.catchPhrase, 20),
  ...randomEvents(faker.lorem.sentence, 20),
];

module.exports = {
  get() {
    return data;
  },

  find(id) {
    return data.find(record => record.id === id);
  },

  create(payload) {
    const record = {
      id: data.length,
      title: payload.title,
      date: payload.date,
    };
    data.push(record);
    return record;
  },

  getOwnedRecordId(userId) {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].owner_id === userId) {
        return i + 1;
      }
    }
    return undefined;
  },

  getUnownedRecordId(userId) {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].owner_id !== userId) {
        return i + 1;
      }
    }
    return undefined;
  },
};
