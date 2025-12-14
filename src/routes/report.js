const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// POST /report
router.post("/", async (req, res) => {
  try {
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;

    if (!ngoId || !month) {
      return res.status(400).json({ error: "ngoId and month are required" });
    }

    await Report.updateOne(
      { ngoId, month },
      { ngoId, month, peopleHelped, eventsConducted, fundsUtilized },
      { upsert: true }
    );

    res.json({ message: "Report submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
