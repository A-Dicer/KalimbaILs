const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./users");
const levelRoutes = require("./levels");
const racesRoutes = require("./races");

// Auth routes
router.use("/auth", authRoutes);
// User routes
router.use("/users", userRoutes);
// Levels routes
router.use("/levels", levelRoutes);
// Races routes
router.use("/races", racesRoutes);

module.exports = router;
