const mongoose = require("mongoose");

const gadgetSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  day: {
    type: String,
    require: true,
  },
  importance: {
    type: Boolean,
    default: false,
  },
  byusername: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Gadgets", gadgetSchema);
