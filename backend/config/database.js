const mongoose = require("mongoose");

// Tries to connect once. The server keeps running if this fails,
// and routes that need the database answer with a 503 error.
async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI is not set. Database features are disabled.");
    return;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

module.exports = connectDatabase;
