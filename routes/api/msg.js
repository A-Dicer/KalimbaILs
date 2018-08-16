const router = require("express").Router();
const msgController = require("../../controllers/msgController");

// Matches with "/msg"
router.route("/")
    .get(msgController.findAll)
    .post(msgController.create);
 
// Matches with "/api/msg/name/:msgName"
router.route("/name/:name").get(msgController.findByName)

module.exports = router;