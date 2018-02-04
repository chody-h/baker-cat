var router = require("express").Router();
var mewController = require("../../controllers/mew");

router.post("/first", mewController.first);
router.post("/last", mewController.last);

module.exports = router;