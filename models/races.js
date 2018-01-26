const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  category: { 
      difficulty: { type: String },
      location: { type: String },
      boss: { type: Boolean },
      startTime: { type: Number},
  },
  levels: [{ type: Schema.Types.ObjectId, ref: 'Level' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
      name: {type: String},
      message: {type: String},
  }],
  raceInfo: [{ 
    name: {type: String},
    times: { 
        total: { type: Number },
        l1: { type: Number },
        l2: { type: Number },
        l3: { type: Number }
    },
    position: { type: Number },
    movement: { type: String}
  }],
});

const Races = mongoose.model("Races", raceSchema);

module.exports = Races;