const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns a trimmed string, or "" when the value is not a string.
function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

// Hidden "website" field: real people leave it empty, simple bots fill it in.
function isSpamBot(body) {
  return cleanText(body.website) !== "";
}

function checkLength(errors, field, label, value, min, max) {
  if (value.length < min) errors[field] = `${label} must be at least ${min} characters.`;
  else if (value.length > max) errors[field] = `${label} must be at most ${max} characters.`;
}

function checkEmail(errors, field, value) {
  if (!EMAIL_PATTERN.test(value) || value.length > 120) {
    errors[field] = "Enter a valid email address.";
  }
}

// Sends a 400 response with field errors, or continues with clean data in req.cleanBody.
function finish(req, res, next, errors, cleanBody) {
  if (isSpamBot(req.body || {})) {
    return res.status(400).json({ message: "Submission rejected." });
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Please fix the highlighted fields.", errors });
  }
  req.cleanBody = cleanBody;
  next();
}

function validateReview(req, res, next) {
  const body = req.body || {};
  const errors = {};
  const data = {
    clientName: cleanText(body.clientName),
    clientEmail: cleanText(body.clientEmail).toLowerCase(),
    projectName: cleanText(body.projectName),
    reviewTitle: cleanText(body.reviewTitle),
    reviewMessage: cleanText(body.reviewMessage),
    rating: Number(body.rating),
  };

  checkLength(errors, "clientName", "Name", data.clientName, 2, 80);
  checkEmail(errors, "clientEmail", data.clientEmail);
  checkLength(errors, "projectName", "Project name", data.projectName, 2, 100);
  checkLength(errors, "reviewMessage", "Review", data.reviewMessage, 20, 1000);
  if (data.reviewTitle.length > 100) errors.reviewTitle = "Title must be at most 100 characters.";
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.rating = "Choose a rating from 1 to 5.";
  }
  finish(req, res, next, errors, data);
}

function validateContact(req, res, next) {
  const body = req.body || {};
  const errors = {};
  const data = {
    name: cleanText(body.name),
    email: cleanText(body.email).toLowerCase(),
    subject: cleanText(body.subject),
    message: cleanText(body.message),
  };

  checkLength(errors, "name", "Name", data.name, 2, 80);
  checkEmail(errors, "email", data.email);
  checkLength(errors, "subject", "Subject", data.subject, 3, 120);
  checkLength(errors, "message", "Message", data.message, 10, 2000);
  finish(req, res, next, errors, data);
}

module.exports = { validateReview, validateContact };
