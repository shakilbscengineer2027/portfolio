const express = require("express");
const requireAdminKey = require("../middleware/requireAdminKey");
const requireDatabase = require("../middleware/requireDatabase");
const {
  listReviewsForAdmin,
  updateReviewStatus,
  deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

// Every route below needs the secret x-admin-key header.
router.use(requireAdminKey, requireDatabase);

router.get("/reviews", listReviewsForAdmin);
router.patch("/reviews/:id", updateReviewStatus);
router.delete("/reviews/:id", deleteReview);

module.exports = router;
