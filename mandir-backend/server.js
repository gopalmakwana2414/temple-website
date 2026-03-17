import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Check ENV variable
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables");
  process.exit(1);
}

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ===========================
   📌 VISITOR SCHEMA
=========================== */
const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mobile: { type: String },
  visit: { type: String, required: true },
  lang: { type: String },
  visitedAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model("Visitor", visitorSchema);

/* ===========================
   📌 DONATION SCHEMA
=========================== */
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);

/* ===========================
   📌 DIYA SCHEMA
=========================== */
const diyaSchema = new mongoose.Schema({
  name: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Diya = mongoose.model("Diya", diyaSchema);

/* ===========================
   🚀 VISITOR API
=========================== */
app.post("/api/visitor", async (req, res) => {
  try {
    const { name, location, mobile, visit, lang } = req.body;

    if (!name || !location || !visit) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = new Visitor({ name, location, mobile, visit, lang });
    await data.save();

    console.log("✅ Visitor saved:", name);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Visitor API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ===========================
   💰 DONATION API
=========================== */

// POST donation
app.post("/api/donation", async (req, res) => {
  try {
    const { name, amount, message } = req.body;

    if (!name || !amount) {
      return res.status(400).json({ error: "Name and amount required" });
    }

    const donation = new Donation({ name, amount, message });
    await donation.save();

    console.log("💰 Donation saved:", name);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Donation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET donations (optional)
app.get("/api/donation", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("❌ Fetch Donation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ===========================
   🪔 DIYA API
=========================== */

// POST diya
app.post("/api/diya", async (req, res) => {
  try {
    const { name, message } = req.body;

    const diya = new Diya({ name, message });
    await diya.save();

    console.log("🪔 Diya lit by:", name);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ Diya Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET diya
app.get("/api/diya", async (req, res) => {
  try {
    const diyas = await Diya.find().sort({ createdAt: -1 });
    res.json(diyas);
  } catch (error) {
    console.error("❌ Fetch Diya Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* ===========================
   🧪 TEST ROUTE
=========================== */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ===========================
   🌐 PORT (Railway)
=========================== */
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});