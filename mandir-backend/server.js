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

// ✅ Schema
const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  mobile: { type: String },
  visit: { type: String, required: true },
  lang: { type: String },
  visitedAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model("Visitor", visitorSchema);

// ✅ POST API
app.post("/api/visitor", async (req, res) => {
  try {
    const { name, location, mobile, visit, lang } = req.body;

    // Validation
    if (!name || !location || !visit) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = new Visitor({
      name,
      location,
      mobile,
      visit,
      lang
    });

    await data.save();

    console.log("✅ Visitor saved:", name);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("❌ API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// ✅ PORT (Railway compatible)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
}); 