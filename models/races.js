const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  category: { 
      difficulty: { type: String },
      location: { type: Array },
      boss: { type: Boolean },
  },
  levels: [{ type: Schema.Types.ObjectId, ref: 'Level' }],
  leaderboard: {type: Array},
  started: {type: String},
  done: {type: String}
});

const Races = mongoose.model("Races", raceSchema);

module.exports = Races;