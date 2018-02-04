var router = require("express").Router();
var testRoutes = require("./test");

router.use("/test", testRoutes);

module.exports = router;