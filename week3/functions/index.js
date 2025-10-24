// functions/index.js
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * GET /countBooks
 * Response: { count: number }
 */
exports.countBooks = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).send("");

  try {
    const snapshot = await admin.firestore().collection("books").get();
    res.status(200).send({count: snapshot.size});
  } catch (err) {
    console.error(err);
    res.status(500).send({error: "Error counting books"});
  }
});
