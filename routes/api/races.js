const router = require("express").Router();
const racesController = require("../../controllers/racesController");

// Matches with "/races"
router.route("/")
    .get(racesController.findAll)
    .post(racesController.create);
 
// Matches with "/api/races/:id"
// router.route("/:id").get(racesController.findById)
 

module.exports = router;