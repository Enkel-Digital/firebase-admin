/**
 * When running on non-gcp cloud provider infra, use this to read service account key either from ENV or file
 * @function getServiceAccountKey
 */
module.exports = function getServiceAccountKey() {
  // If inside env var return it after parsing
  if (process.env.serviceAccountKey)
    return JSON.parse(process.env.serviceAccountKey);
  else {
    /**
     * Else read the file directly
     * Usually when running service locally
     * Service Key json to be placed in root dir/
     */
    const serviceAccountFile = require("path").join(
      __dirname,
      "../../serviceAccountKey.json"
    );

    // Inner import as only used conditionally
    const fs = require("fs");

    if (fs.existsSync(serviceAccountFile)) return require(serviceAccountFile);
    else
      throw new Error(
        `Service Account Key file not available locally at: "${serviceAccountFile}"`
      );
  }
};
