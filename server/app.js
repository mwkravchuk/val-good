require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Routers
const authRouter = require("./routes/auth");
const playerRouter = require("./routes/player");
const valorantRouter = require("./routes/valorant");

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json()); // So express can handle json
app.use(express.urlencoded({ extended: true })); // url-encoded data

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONNECTION_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use("/api/auth", authRouter);
app.use("/api/player", playerRouter);
app.use("/api/valorant", valorantRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`val-good API - listening on port ${PORT}!`)
);
