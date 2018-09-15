const db = require("../models");

// Defining methods for the raceController
module.exports = {

//---------------------------- Find All Races -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.Races
        .find(req.query)
        .populate({
            path: 'levels',
            select: 'name time difficulty location rank type levelid',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session.passport}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

//-------------------------- Find a Race by ID ------------------------------
  findById: function (req, res) {
      db.Races   
        .findById(req.params.id)
        .populate({
            path: 'levels',
            select: 'name time difficulty location rank type levelid',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session.passport}))
        .catch(err => res.status(422).json(err));
  },


//---------------------------- Create a Race --------------------------------
  create: function(req, res) {
    db.Races
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

//---------------------------- Udate a Race ---------------------------------
  update: function(req, res) {
      console.log("udating race")
      db.Races.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

  }
};