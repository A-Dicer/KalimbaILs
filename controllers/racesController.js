const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
      console.log("find all races:");
      console.log(req.query);
      console.log("-------");
     
      db.Races
        .find(req.query)
        .populate({
            path: 'players',
            select: 'userName imgLink email',
        })
        .populate({
            path: 'levels',
            select: 'name difficulty location rank type',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  create: function(req, res) {
    db.Races
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


//   findById: function (req, res) {
//     if (req.user) {
//         console.log(req.params.id)
//       db.Levels
//         .findById(req.params.id)
//         .then(dbModel => res.json({results: dbModel, sess: req.session}))
//         .catch(err => res.status(422).json(err));

//     }
//     else { res.json({ error: "Please login", statusCode: 401 }) }
//   },
};
