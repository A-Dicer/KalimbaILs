const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  levelId: {type: Number},
  name: {type: String },
  location: {type: String},
  difficulty: {type: String },
  rank: {type: Number},
  time: {type: Number },
  type: {type: String},
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;