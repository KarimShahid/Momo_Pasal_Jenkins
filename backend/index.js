const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/menu", (req, res) => {
  res.json([
    { id: 1, name: "Buff Momo", price: 120 },
    { id: 2, name: "Chicken Momo", price: 150 },
    { id: 3, name: "Chicken Chilly Momo", price: 180 },
    { id: 4, name: "Veg Momo", price: 100 }
  ]);
});

app.listen(PORT, () => {
  console.log(`🥟 Momo backend running on port ${PORT}`);
});