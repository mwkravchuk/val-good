require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`val-good API - listening on port ${PORT}!`)
);
