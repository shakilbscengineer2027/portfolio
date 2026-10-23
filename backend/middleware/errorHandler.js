// Handles unknown routes.
function notFoundHandler(req, res) {
  res.status(404).json({ message: "Route not found." });
}

// Handles every other error. Details stay in the server log, never in the response.
function errorHandler(error, req, res, next) {
  console.error("Unhandled error:", error.message);

  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request is too large." });
  }
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON." });
  }
  res.status(500).json({ message: "Something went wrong on the server." });
}

module.exports = { notFoundHandler, errorHandler };
