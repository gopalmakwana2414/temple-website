import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS FIX
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

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

// Visitor Schema
const visitorSchema = new mongoose.Schema({
  name: String,
  location: String,
  mobile: String,
  visit: String,
  lang: String,
  visitedAt: { type: Date, default: Date.now }
});
const Visitor = mongoose.model("Visitor", visitorSchema);

// POST API
app.post("/api/visitor", async (req, res) => {
  try {
    const data = new Visitor(req.body);
    await data.save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// TEST
app.get("/", (req, res) => {
  res.send("API running");
});

// ✅ IMPORTANT PORT FIX
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});