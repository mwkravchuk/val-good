require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Routers
const playerRouter = require("./routes/player");
const valorantRouter = require("./routes/valorant");

// Middleware
app.use(cors());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use("/api/player", playerRouter);
app.use("/api/valorant", valorantRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`val-good API - listening on port ${PORT}!`)
);
