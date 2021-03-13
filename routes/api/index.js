const router = require("express").Router();
const groupRoutes = require("./groups");
const userRoutes = require("./users");

router.use("/groups", groupRoutes);
router.use("/users", userRoutes);

module.exports = router;