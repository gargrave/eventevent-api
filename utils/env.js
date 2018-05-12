module.exports = {
  isNotProd: () =>
    (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'),
};
