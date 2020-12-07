/**
 * Module wrapper around firebase-admin to initialize it based on the platform we run it on.
 * @author JJ
 * @module Firebase Admin initialized app singleton
 */

const admin = require("firebase-admin");
const getServiceAccountKey = require("./getServiceAccountKey");

function initializeApp(options = {}) {
  try {
    /**
     * Set GCP=true when using Google's infra, to use Google Application Default Credentials
     * Which are available by default so we do not need to get service key.
     * By default GCP provides "GOOGLE_APPLICATION_CREDENTIALS" env var, but this strat 1 out of 2
     * Thus using custom "GCP" env var to ensure availability
     * Refer to https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application
     */
    if (
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.GCP ||
      Boolean(admin.credential.applicationDefault().projectId)
    )
      return admin.initializeApp({
        ...options,
        credential: admin.credential.applicationDefault(),
      });

    // Initialize with a key from ENV var or a file
    return admin.initializeApp({
      ...options,
      credential: admin.credential.cert(getServiceAccountKey()),
    });
  } catch (error) {
    console.error(error);

    // @todo Might potentially cut off un-finished stdout/stderr processes
    process.exit(1);
  }
}

const initializeAppWithApplicationDefault = (options) =>
  admin.initializeApp({
    ...options,
    credential: admin.credential.applicationDefault(),
  });

// Alternatively
function initializeApp2(options = {}) {
  try {
    // If env var for default credentials set, and is a JSON string, parse and use this
    if (
      process.env.GOOGLE_APPLICATION_CREDENTIALS &&
      process.env.GOOGLE_APPLICATION_CREDENTIALS.charAt(0) === "{"
    )
      return admin.initializeApp({
        ...options,
        credential: admin.credential.cert(
          JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        ),
      });

    // If env var for default credentials set, assuming it is not JSON, assume it is a path, thus call application default
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS)
      return initializeAppWithApplicationDefault(options);

    // If env var for default credentials NOT set, see if "serviceAccountKeyPath" passed in via options
    if (
      !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
      process.env.serviceAccountKey
    )
      return admin.initializeApp({
        ...options,
        credential: admin.credential.cert(
          JSON.parse(process.env.serviceAccountKey)
        ),
      });

    // If env var for default credentials NOT set, see if "serviceAccountKeyPath" passed in via options
    if (
      !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
      option.serviceAccountKeyPath
    ) {
      // @todo See if this works
      // Set credentials onto env var IN THIS CONTEXT ONLY (this env var does not persist across process respawn)
      process.env.GOOGLE_APPLICATION_CREDENTIALS = option.serviceAccountKeyPath;
      // Remove from options that is used to initialize the admin client
      delete option.serviceAccountKeyPath;

      return initializeAppWithApplicationDefault(options);
    }
  } catch (error) {
    console.error(error);
    process.exit(1); // Note that this potentially cut offs un-finished stdout/stderr processes
  }
}

module.exports = initializeApp();
module.exports.initializeApp = initializeApp;
