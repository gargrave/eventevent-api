module.exports = {
  /**
   * Expands the provided URL with the base of the API's URL
   * @param {string} url The URL to expand
   */
  apiUrl: url => `/api/v1${url}`,
};
