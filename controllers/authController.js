const passport = require("passport");
const User = require("../models/user");

// Defining methods for the authController
module.exports = {
  
  logout: function (req, res) {
    req.logOut();
    return res.status(200).json({result:  "success"});
  }
};
