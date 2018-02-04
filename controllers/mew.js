// Mew Controller
// ==============
var db = require("../models");
var slack = require("../scripts/slack");

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

    // find the matching start-session message to make a new leaderboard entry
    db.Mew
      .findOne({
        "localId": newMew.localId,
        "sessionId": newMew.sessionId,
        "publicIp": newMew.publicIp,
        "type": "first"
      })
      .then(function(firstMew) {
        var newScore = {
          localId: firstMew.localId,
          sessionId: firstMew.sessionId,
          publicIp: firstMew.publicIp,
          name: newMew.name,
          score: ((Date.now() - firstMew.date) / 1000).toFixed(1)
        };
        return db.Score.create(newScore);
      })
      .then(function(dbScore){
        console.log(dbScore);
        slack(dbScore);
      });

    // save the end-session message and return
    db.Mew
      .create(newMew)
      .then(function(dbMew) {
        // console.log(dbMew);
        res.json(dbMew);
      });
  }
};