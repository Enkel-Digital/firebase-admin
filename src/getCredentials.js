const { applicationDefault, cert } = require("firebase-admin/app");

/**
 * Return credentials based on hosting platform.
 * Will return applicationDefault if running on supported GCP projects
 * Or returns cert based credential using getServiceAccountKey module loaded lazily
 *
 * NOTES ON USING GCP:
 * Set GCP=true when using Google's infra, to use Google Application Default Credentials
 * Which are available by default so we do not need to get service key.
 * By default GCP provides "GOOGLE_APPLICATION_CREDENTIALS" env var, but this strat 1 out of 2
 * Thus using custom "GCP" env var to ensure availability
 * Refer to https://cloud.google.com/docs/authentication/production#providing_credentials_to_your_application
 */
module.exports = function getCredentials() {
  return process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.GCP ||
    Boolean(applicationDefault()?.projectId)
    ? applicationDefault()
    : cert(require("./getServiceAccountKey")());
};
