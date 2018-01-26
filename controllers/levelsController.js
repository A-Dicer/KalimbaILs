const db = require("../models");

// Defining methods for the levels Controller
module.exports = {
  findAll: function (req, res) {
      console.log("find all levels:");
      console.log(req.query);
      console.log("-------");
     
      db.Levels
        .find(req.query)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    if (req.user) {
        console.log(req.params.id)
      db.Levels
        .findById(req.params.id)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));

    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },
};
