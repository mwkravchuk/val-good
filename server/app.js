require("dotenv").config();
const express = require("express");
const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`val-good API - listening on port ${PORT}!`)
);
