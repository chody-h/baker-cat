// Mew model
// =========

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the mewSchema with our schema class
var mewSchema = new Schema({
  // localId, a string, must be entered
  localId: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  // ip, a string, must be entered
  ip: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  date: {
    type: String,
    default: Date.now
  }
});

// Create the Mew model using the mewSchema
var Mew = mongoose.model("Mew", mewSchema);

// Export the Mew model
module.exports = Mew;