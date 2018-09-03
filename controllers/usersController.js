const db = require("../models");

// Defining methods for the usersController
module.exports = {

  //---------------------------- Find All Users -------------------------------
  findAll: function (req, res) {
    if (req.user) {
      db.User
        .find(req.query)
        .populate({
          path: 'inRace',
          select: 'category.startTime',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session.passport}))
        .catch(err => res.status(422).json(err));
    } else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  //-------------------------- Find a User by ID ------------------------------
  findById: function (req, res) {
    if (req.user) {
      db.User
        .findById(req.params.id)
        .populate({
          path: 'inRace',
          select: 'category.startTime',
        })
        .then(dbModel => res.json({results: dbModel, sess: req.session.passport}))
        .catch(err => res.status(422).json(err));
    }
    else { res.json({ error: "Please login", statusCode: 401 }) }
  },

  //---------------------------- Udate a User ---------------------------------
  updateUser: function(req, res) {
    if(req.user){
      db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else { res.json({error: "Please login", statusCode: 401})}
  }

};
