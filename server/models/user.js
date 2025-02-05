// User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  profileIcon: { type: String },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
