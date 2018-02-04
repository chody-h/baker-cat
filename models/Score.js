// Score model
// ===========

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the scoreSchema with our schema class
var scoreSchema = new Schema({
  // localId: client-created GUID. retrieved from LocalStorage
  localId: {
    type: String,
    required: true
  },
  // sessionId: client-created date. retrieved from SessionStorage. comes in pairs
  sessionId: {
    type: Number,
    required: true
  },
  // publicIp: server-side. where the request came from.
  publicIp: {
    type: String,
    required: true
  },
  // name: client-designated name of the cat (who got bakercatted)
  name: {
    type: String,
    required: false
  },
  // date: server-side. when the request was received.
  date: {
    type: Number,
    default: Date.now
  },
  // score: server-side. calculated by diff of two dates
  score: {
    type: Number,
    required: true
  }
});

// Create the Score model using the scoreSchema
var Score = mongoose.model("Score", scoreSchema);

// Export the Score model
module.exports = Score;