const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
    name: {type: String},
    type: {type: String},
    msg:  {type: Array}
});

const Msg = mongoose.model("Msg", MsgSchema);

module.exports = Msg;