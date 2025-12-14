const fs = require("fs");
const csv = require("csv-parser");
const Report = require("../models/Report");
const Job = require("../models/Job");

const processCsv = (filePath, jobId) => {
  let total = 0;
  

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      total++;
      try {
        await Report.updateOne(
          { ngoId: row.ngoId, month: row.month },
          row,
          { upsert: true }
        );
        await Job.updateOne({ jobId }, { $inc: { processed: 1 } });
      } catch {
        await Job.updateOne({ jobId }, { $inc: { failed: 1 } });
      }
    })
    .on("end", async () => {
      await Job.updateOne(
        { jobId },
        { total, status: "COMPLETED" }
      );
      fs.unlinkSync(filePath);
    });
};

module.exports = processCsv;
