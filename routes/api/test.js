var router = require("express").Router();
var testController = require("../../controllers/test");

router.get("/", testController.test);
router.post("/", testController.testPost);

module.exports = router;