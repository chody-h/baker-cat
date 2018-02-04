// Mew model
// =========

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the mewSchema with our schema class
var mewSchema = new Schema({
  // localId: client-created GUID. retrieved from LocalStorage
  localId: {
    type: String,
    required: true
  },
  // sessionId: client-created date. retrieved from SessionStorage. comes in pairs
  sessionId: {
    type: String,
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
    type: String,
    default: Date.now
  },
  // type: "first" or "last"
  type: {
    type: String,
    required: true
  }
});

// Create the Mew model using the mewSchema
var Mew = mongoose.model("Mew", mewSchema);

// Export the Mew model
module.exports = Mew;