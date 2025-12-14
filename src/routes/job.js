const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /job-status/:jobId
router.get("/:jobId", async (req, res) => {
  const job = await Job.findOne({ jobId: req.params.jobId });
  if (!job) return res.status(404).json({ error: "Job not found" });

  res.json(job);
});

module.exports = router;
