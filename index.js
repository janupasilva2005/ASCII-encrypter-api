const express = require("express");
const dotenv = require("dotenv");
const MainRoute = require("./routes/main.route");

dotenv.config();

const app = express();

app.use("/api/v1", MainRoute);

app.get("/", (req, res) => {
  res.json({ msg: "Connected" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port: ${process.env.PORT || 5000}`);
});
