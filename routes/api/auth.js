const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require("passport");

// Matches with "/api/auth"

//twitch sign in
router.route("/twitch").get(passport.authenticate("twitch"))

router.route("/twitch/callback")
.get(passport.authenticate("twitch", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect("/main");
});

//logout
router.route("/logout").get(authController.logout)
  
module.exports = router;
