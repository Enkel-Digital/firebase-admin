/**
 * Module wrapper around firebase-admin to initialize it with the
 * appropriate credentials based on the current platform it is on.
 * @author JJ
 * @module Firebase Admin initializeApp function
 */
module.exports = function (options = {}) {
  try {
    const { initializeApp } = require("firebase-admin/app");
    const getCredentials = require("./getCredentials");

    return initializeApp({
      ...options,
      credential: getCredentials(),
    });
  } catch (error) {
    console.error(error);

    // @todo Might potentially cut off un-finished stdout/stderr processes
    process.exit(1);
  }
};
