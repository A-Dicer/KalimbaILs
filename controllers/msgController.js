const db = require("../models");

// Defining methods for the msg Controller
module.exports = {
  findAll: function (req, res) {
      db.Msg
        .find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
        
  },

  findByName: function (req, res) {
      console.log(req.params)
      db.Msg
        .findOne(req.params)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Msg
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

};