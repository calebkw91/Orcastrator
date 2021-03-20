const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true },
  admin: {type: String, required: true},
  description: {type: String, required: false},
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  properties:[],
  fullUsers:[]
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;