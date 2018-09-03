const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/").get(usersController.findAll)
 
// Matches with "/api/users/:id"
router.route("/:id").get(usersController.findById).put(usersController.updateUser)

module.exports = router;
