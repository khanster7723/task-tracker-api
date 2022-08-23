const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  day: {
    type: String,
    require: true,
  },
  byusername: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Events", eventSchema);
