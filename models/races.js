const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  category: { 
      difficulty: { type: String },
      location: { type: Array },
      boss: { type: Boolean },
      startTime: { type: Number},
  },
  levels: [{ type: Schema.Types.ObjectId, ref: 'Level' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  leaderboard: { type: Array},
  started: {type: String}
});

const Races = mongoose.model("Races", raceSchema);

module.exports = Races;