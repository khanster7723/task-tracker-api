const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  day: {
    type: String,
    require: true,
  },
  lastupdatedon: {
    type: String,
    require: true,
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  byusername: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Tasks", taskSchema);
