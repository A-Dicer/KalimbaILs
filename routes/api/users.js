const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/").get(usersController.findAll)
 
// Matches with "/api/users/:id"
router.route("/:id").get(usersController.findById)

// Matches with "/api/users/name/:userName"
router.route("/name/:userName").get(usersController.findByName)
 

module.exports = router;
