require("dotenv").config();
const express = require("express");
const app = express();

const connectDB = require("./config/database");

const report = require("./routes/report");
const upload = require("./routes/upload");
const dashboard = require("./routes/dashboard");
const job = require("./routes/job");

const cors = require("cors");



// middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://web-frontend-two-azure.vercel.app",
    "https://web-frontend-vedant-sanjay-kavhars-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// routes
app.use("/report", report);
app.use("/reports", upload);
app.use("/dashboard", dashboard);
app.use("/job-status", job);

// start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
