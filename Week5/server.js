const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/subscribe", (req, res) => {
  console.log("Body received:", req.body);   
  const { email } = req.body;

  if (!email || !emailRegex.test(email)) {
    console.log("❌ Invalid email submitted");
    return res.status(400).json({ error: "Please provide a valid email." });
  }

  console.log(`✅ New subscription: ${email}`);
  res.status(200).json({ message: "Subscribed successfully." });
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
