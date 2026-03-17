import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 🔥 FINAL CORS FIX (works 100%)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Diya
const diyaSchema = new mongoose.Schema({
  name: String,
  village: String,
  litAt: { type: Date, default: Date.now }
});
const Diya = mongoose.model("Diya", diyaSchema);

app.post("/api/diya", async (req, res) => {
  try {
    const { name, village } = req.body;
    const entry = new Diya({ name, village });
    await entry.save();
    const total = await Diya.countDocuments();
    res.json({ total });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/diya", async (req, res) => {
  try {
    const total = await Diya.countDocuments();
    res.json({ total });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Visitor
const visitorSchema = new mongoose.Schema({
  name: String,
  location: String,
  mobile: String,
  visit: String,
  lang: String,
  visitedAt: { type: Date, default: Date.now }
});
const Visitor = mongoose.model("Visitor", visitorSchema);

app.post("/api/visitor", async (req, res) => {
  try {
    const data = new Visitor(req.body);
    await data.save();
    res.json({ message: "ok" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Donation
const donationSchema = new mongoose.Schema({
  donationID: String,
  name: String,
  address: String,
  mobile: String,
  amount: Number,
  txnID: String,
  donatedAt: { type: Date, default: Date.now }
});
const Donation = mongoose.model("Donation", donationSchema);

app.post("/api/donation", async (req, res) => {
  try {
    const data = new Donation(req.body);
    await data.save();
    res.json({ message: "ok" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));