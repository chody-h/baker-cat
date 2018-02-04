// Mew Controller
// ==============
var db = require("../models");

module.exports = {
  first: function (req, res) {
    var newMew = req.body;
    newMew.type = "first";
    newMew.publicIp = req.ip;
    db.Mew
      .create(newMew)
      .then(function(dbMew) {
        console.log(dbMew);
        res.json(dbMew);
      });
  },

  last: function (req, res) {
    var newMew = req.body;
    newMew.type = "last";
    newMew.publicIp = req.ip;
    db.Mew
      .create(newMew)
      .then(function(dbMew) {
        console.log(dbMew);
        res.json(dbMew);
      });
  }
};