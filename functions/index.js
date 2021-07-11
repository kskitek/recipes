const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();


const defaultOpts = {
  memory: "128MB",
  timeoutSeconds: 60,
  maxInstances: 1,
};

const region = "europe-west3";


exports.backupDB = functions.region(region).runWith(defaultOpts)
  .https.onCall((data, context) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const backupBucket = `gs://${projectId}-firestore-backups/`;
    const databaseName = client.databasePath(projectId, "(default)");

    console.log("Starting backup of firestore", projectId);
    let name = new Date().toISOString();
    if (data.name) {
      name += "_" + data.name;
    }


    return client.exportDocuments({
      name: databaseName,
      outputUriPrefix: backupBucket + name,
      collectionIds: [],
    }).then((responses) => {
      const response = responses[0];
      console.log(`Operation Name: ${response["name"]}`);
    }).catch((err) => {
      console.error(err);
      throw new Error("Export operation failed");
    });
  });

exports.blockNewUsers = functions.region(region).runWith(defaultOpts)
  .auth.user().onCreate((user, context) => {
    return admin.auth().updateUser(user.uid, {disabled: true})
      .then((userRecord) => console.log("Auto blocked user", userRecord.toJSON()))
      .catch((error) => console.log("Error auto blocking:", error));
  });

