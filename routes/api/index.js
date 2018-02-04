var router = require("express").Router();
var mewRoutes = require("./mew");

router.use("/mew", mewRoutes);

module.exports = router;