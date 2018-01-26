const router = require("express").Router();
const levelsController = require("../../controllers/levelsController");

// Matches with "/level"
router.route("/").get(levelsController.findAll)
 
// Matches with "/api/level/:id"
router.route("/:id").get(levelsController.findById)
 

module.exports = router;