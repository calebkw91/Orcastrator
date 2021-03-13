const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  portrait: { type: String, required: true },
  userId: { type: String, required: true },
});

// userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;