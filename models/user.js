const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  twitchId: { type: String },
  username: { type: String },
  imgLink: { type: String },
  email: { type: String },
  inRace: { type: Schema.Types.ObjectId, ref: 'Races', },
});

userSchema.plugin(passLocalMon);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
