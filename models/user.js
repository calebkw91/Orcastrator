const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: false },
  portrait: { type: String, required: true },
  userId: { type: String, required: true },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

// userSchema.plugin(passportLocalMongoose);

userSchema.pre("save", function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
    next();
  }
  catch (error) {
    next(error)
  }
})

userSchema.statics.comparePassword = async function (password, user) {
  try {
    const res = await User.findOne({ name: user });
    const result = bcrypt.compareSync(password, res.password);
    return result;
  } catch (error) {
    throw error
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;