const mongoose = require("mongoose");
const Review = require("../models/Review");
const { sendReviewNotification } = require("../utils/emailService");

const PUBLIC_FIELDS = "clientName projectName rating reviewTitle reviewMessage createdAt";

// Public: approved reviews only, newest first. Emails are never selected.
async function getApprovedReviews(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);

    const [reviews, total, stats] = await Promise.all([
      Review.find({ status: "approved" })
        .select(PUBLIC_FIELDS)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Review.countDocuments({ status: "approved" }),
      Review.aggregate([
        { $match: { status: "approved" } },
        { $group: { _id: null, average: { $avg: "$rating" } } },
      ]),
    ]);

    const averageRating = stats.length ? Math.round(stats[0].average * 10) / 10 : 0;
    res.json({ reviews, total, page, averageRating });
  } catch (error) {
    next(error);
  }
}

// Public: saves a new review as "pending". Status is never taken from the request.
async function createReview(req, res, next) {
  try {
    const savedReview = await Review.create({ ...req.cleanBody, status: "pending" });
    // The review is already saved. A failed email does not change the response.
    await sendReviewNotification(savedReview);
    res.status(201).json({
      message: "Thank you! Your review was received and will appear after approval.",
    });
  } catch (error) {
    next(error);
  }
}

// Admin: list reviews by status (default pending). Includes email for the owner.
async function listReviewsForAdmin(req, res, next) {
  try {
    const allowed = ["pending", "approved", "rejected"];
    const status = allowed.includes(req.query.status) ? req.query.status : "pending";
    const reviews = await Review.find({ status }).sort({ createdAt: -1 }).limit(100).lean();
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
}

// Admin: approve or reject one review.
async function updateReviewStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid review id." });
    }
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Status must be approved, rejected or pending." });
    }

    const review = await Review.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!review) return res.status(404).json({ message: "Review not found." });

    res.json({ message: `Review marked as ${status}.`, id: review._id, status: review.status });
  } catch (error) {
    next(error);
  }
}

// Admin: permanently delete one review (useful for data-removal requests).
async function deleteReview(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid review id." });
    }
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });
    res.json({ message: "Review deleted." });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getApprovedReviews,
  createReview,
  listReviewsForAdmin,
  updateReviewStatus,
  deleteReview,
};
