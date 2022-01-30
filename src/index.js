/**
 * Module wrapper around firebase-admin.
 * 1. To initialize firebase based on the platform we run it on.
 * 2. Create and export default service objects for the most commonly used modules, firestore and auth.
 * @author JJ
 * @module Firebase Admin initialized app singleton
 */

// Import initializeApp to export it and the default firebase app
const initializeApp = require("./initializeApp.js");
module.exports = initializeApp();
module.exports.initializeApp = initializeApp;

// Import getFirestore to export it and the default firestore service
const { getFirestore } = require("firebase-admin/firestore");
module.exports.fs = getFirestore();
module.exports.getFirestore = getFirestore;

// Import getAuth to export it and the default auth service
const { getAuth } = require("firebase-admin/auth");
module.exports.auth = getAuth();
module.exports.getAuth = getAuth;
