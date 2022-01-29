/**
 * Module wrapper around firebase-admin to initialize it based on the platform we run it on.
 * @author JJ
 * @module Firebase Admin initialized app singleton
 */

const getCredentials = require("./getCredentials");

function initializeApp(options = {}) {
  try {
    const { initializeApp } = require("firebase-admin/app");
    return initializeApp({
      ...options,
      credential: getCredentials(),
    });
  } catch (error) {
    console.error(error);

    // @todo Might potentially cut off un-finished stdout/stderr processes
    process.exit(1);
  }
}

module.exports = initializeApp();
module.exports.initializeApp = initializeApp;
