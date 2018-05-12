// error creating a new record
const failedToCreate = model =>
  `${model} creation failed.`;

// error deleting an existing record
const failedToDelete = model =>
  `${model} deletion failed.`;

// no record with matching ID in database
const failedToFind = (model, id) =>
  `No ${model} with id '${id}' could be found.`;

// error updating an existing record
const failedToUpdate = model =>
  `${model} update failed.`;

// error listing existing records
const failedToList = model =>
  `${model} listing failed.`;

// invalid foreign key
const invalidForeignKey = (model, id) =>
  `No matching ${model} found for foreign key: ${id}.`;

// invalid login attempt
const invalidLogin = () =>
  'Could not log in with the provided credentials.';

// attempting to create a duplicate entry
const matchingRecord = model =>
  `A matching ${model} already exists.`;

// another user is already registered with this email
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
