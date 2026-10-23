const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true, maxlength: 80 },
    clientEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    projectName: { type: String, required: true, trim: true, maxlength: 100 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewTitle: { type: String, trim: true, maxlength: 100, default: "" },
    reviewMessage: { type: String, required: true, trim: true, minlength: 20, maxlength: 1000 },
    // New reviews are always "pending" until the owner approves them.
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
