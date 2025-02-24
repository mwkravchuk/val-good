// Match model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  matchId: { type: String, required: true },
  matchData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export model
module.exports = mongoose.model("Match", MatchSchema);
