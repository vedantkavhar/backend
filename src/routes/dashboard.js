const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// GET /dashboard?month=YYYY-MM
router.get("/", async (req, res) => {
  const { month } = req.query;

  const result = await Report.aggregate([
    { $match: { month } },
    {
      $group: {
        _id: null,
        ngos: { $addToSet: "$ngoId" },
        peopleHelped: { $sum: "$peopleHelped" },
        eventsConducted: { $sum: "$eventsConducted" },
        fundsUtilized: { $sum: "$fundsUtilized" }
      }
    },
    {
      $project: {
        totalNGOs: { $size: "$ngos" },
        peopleHelped: 1,
        eventsConducted: 1,
        fundsUtilized: 1
      }
    }
  ]);

  res.json(result[0] || {});
});

module.exports = router;
