// Test Controller
// ===============
var db = require("../models");

module.exports = {
  test: function (req, res) {
    return res.json({ test: "Hello world!" });
  },

  testPost: function (req, res) {
    db.Mew
      .create(req.body)
      .then(function(dbMew) {
        res.json(dbMew);
      })
      .catch(function(err) {
        res.json(err);
      });
  }
};