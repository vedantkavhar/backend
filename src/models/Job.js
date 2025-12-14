const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: { type: String, unique: true },
    total: { type: Number, default: 0 },
    processed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["IN_PROGRESS", "COMPLETED"],
      default: "IN_PROGRESS"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
