/**
 * Module wrapper around firebase-admin to initialize it based on the platform we run it on.
 * @author JJ
 * @module Firebase Admin initialized app singleton
 */

const initializeApp = require("./initializeApp.js");
module.exports = initializeApp();
module.exports.initializeApp = initializeApp;
