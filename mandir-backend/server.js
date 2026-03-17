import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://matakheda-mandir-tukral.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const diyaSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  village: { type: String, required: true, trim: true },
  litAt: { type: Date, default: Date.now },
});
const Diya = mongoose.model("Diya", diyaSchema);

app.post("/api/diya", async (req, res) => {
  try {
    const { name, village } = req.body;
    if (!name || !village) {
      return res.status(400).json({ error: "Name and village are required." });
    }
    const entry = new Diya({ name, village });
    await entry.save();
    const total = await Diya.countDocuments();
    res.status(201).json({ message: "Diya lit 🪔", total });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

app.get("/api/diya", async (req, res) => {
  try {
    const total = await Diya.countDocuments();
    const recent = await Diya.find()
      .sort({ litAt: -1 })
      .limit(10)
      .select("name village litAt");
    res.json({ total, recent });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  mobile: { type: String, default: null, trim: true },
  visit: { type: String, enum: ["visited", "planning", "online"], required: true },
  lang: { type: String, default: "en" },
  visitedAt: { type: Date, default: Date.now },
});
const Visitor = mongoose.model("Visitor", visitorSchema);

app.post("/api/visitor", async (req, res) => {
  try {
    const { name, location, mobile, visit, lang } = req.body;
    if (!name || !location || !visit) {
      return res.status(400).json({ error: "Name, location and visit status are required." });
    }
    const entry = new Visitor({ name, location, mobile: mobile || null, visit, lang });
    await entry.save();
    res.status(201).json({ message: "Visitor registered" });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

const donationSchema = new mongoose.Schema({
  donationID: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  txnID: { type: String, required: true, trim: true },
  donatedAt: { type: Date, default: Date.now },
});
const Donation = mongoose.model("Donation", donationSchema);

app.post("/api/donation", async (req, res) => {
  try {
    const { donationID, name, address, mobile, amount, txnID } = req.body;
    if (!donationID || !name || !address || !mobile || !amount || !txnID) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const entry = new Donation({
      donationID,
      name,
      address,
      mobile,
      amount: Number(amount),
      txnID,
    });
    await entry.save();
    res.status(201).json({ message: "Donation saved", donationID });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));