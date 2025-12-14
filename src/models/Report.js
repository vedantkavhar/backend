const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    ngoId: { type: String, required: true },
    month: { type: String, required: true }, // YYYY-MM
    peopleHelped: { type: Number, default: 0 },
    eventsConducted: { type: Number, default: 0 },
    fundsUtilized: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// 🔑 Idempotency guarantee
reportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Report", reportSchema);
