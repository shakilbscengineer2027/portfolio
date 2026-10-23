const crypto = require("crypto");

// Hash both values so timingSafeEqual always compares equal-length buffers.
function hash(value) {
  return crypto.createHash("sha256").update(value).digest();
}

// Protects moderation routes. The key lives only in the server's .env file.
function requireAdminKey(req, res, next) {
  const serverKey = process.env.ADMIN_API_KEY;

  if (!serverKey || serverKey.length < 32) {
    return res.status(503).json({ message: "Admin access is not configured." });
  }

  const sentKey = req.get("x-admin-key") || "";
  if (!crypto.timingSafeEqual(hash(sentKey), hash(serverKey))) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  next();
}

module.exports = requireAdminKey;
