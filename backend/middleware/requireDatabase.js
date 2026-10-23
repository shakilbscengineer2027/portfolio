const mongoose = require("mongoose");

// Stops the request early when MongoDB is not connected.
function requireDatabase(req, res, next) {
  const isConnected = mongoose.connection.readyState === 1;
  if (!isConnected) {
    return res.status(503).json({ message: "The database is not available right now." });
  }
  next();
}

module.exports = requireDatabase;
