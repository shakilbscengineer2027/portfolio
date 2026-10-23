const rateLimit = require("express-rate-limit");

// Limits how many times one IP can submit a form per hour.
function createFormLimiter(maxRequests) {
  return rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many submissions. Please try again later." },
  });
}

const reviewLimiter = createFormLimiter(5);
const contactLimiter = createFormLimiter(5);

module.exports = { reviewLimiter, contactLimiter };
