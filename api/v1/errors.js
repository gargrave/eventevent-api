/** Error message for creating a new record */
const failedToCreate = model =>
  `${model} creation failed.`;

/** Error message for deleting an existing record */
const failedToDelete = model =>
  `${model} deletion failed.`;

/** Error message for no record with matching ID in database */
const failedToFind = (model, id) =>
  `No ${model} with id '${id}' could be found.`;

/** Error message for updating an existing record */
const failedToUpdate = model =>
  `${model} update failed.`;

/** Error message for listing existing records */
const failedToList = model =>
  `${model} listing failed.`;

/** Error message for invalid foreign key */
const invalidForeignKey = (model, id) =>
  `No matching ${model} found for foreign key: ${id}.`;

/** Error message for invalid login attempt */
const invalidLogin = () =>
  'Could not log in with the provided credentials.';

/** Error message for attempting to create a duplicate entry */
const matchingRecord = model =>
  `A matching ${model} already exists.`;

/** Error message for another user is already registered with this email */
const userExists = () =>
  'Email is already in use by another user.';

module.exports = {
  failedToCreate,
  failedToDelete,
  failedToList,
  failedToUpdate,
  invalidForeignKey,
  invalidLogin,
  matchingRecord,
  failedToFind,
  userExists,
};
