const db = require("../models");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
      console.log("find all:");
      console.log(req.query);
      console.log("-------");
     
      db.User
        .find(req.query)
        .populate({
          path: 'inRace',
          select: 'category.startTime',
      })
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
  },

  findById: function (req, res) {
    if (req.user) {
        console.log(req.params.id)
      db.User
        .findById(req.params.id)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  findById: function (req, res) {
    if (req.user) {
        console.log(req.params.id)
      db.User
        .findById(req.params.id)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  findByName: function (req, res) {
    if (req.user) {
      db.User
        .findOne(req.params)
        .then(dbModel => res.json({results: dbModel, sess: req.session}))
        .catch(err => res.status(422).json(err));
    } else { 
        res.json({ error: "Please login", statusCode: 401 }) 
    }
  },

};
