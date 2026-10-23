const express = require("express");
const requireDatabase = require("../middleware/requireDatabase");
const { contactLimiter } = require("../middleware/rateLimiter");
const { validateContact } = require("../middleware/validateInput");
const { createContactMessage } = require("../controllers/contactController");

const router = express.Router();

router.post("/", contactLimiter, requireDatabase, validateContact, createContactMessage);

module.exports = router;
