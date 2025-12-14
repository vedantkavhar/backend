const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const Job = require("../models/Job");
const processCsv = require("../jobs/processCsv");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /reports/upload
router.post("/upload", upload.single("file"), async (req, res) => {
   console.log("📥 Upload route hit");

   if (!req.file) {
    console.error("❌ No file received");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📄 File info:", req.file);
  const jobId = uuidv4();

  await Job.create({ jobId });

  processCsv(req.file.path, jobId); // async

  res.json({ jobId });
});

module.exports = router;
