const express = require("express");
const requireDatabase = require("../middleware/requireDatabase");
const { reviewLimiter } = require("../middleware/rateLimiter");
const { validateReview } = require("../middleware/validateInput");
const { getApprovedReviews, createReview } = require("../controllers/reviewController");

const router = express.Router();

router.get("/", requireDatabase, getApprovedReviews);
router.post("/", reviewLimiter, requireDatabase, validateReview, createReview);

module.exports = router;
