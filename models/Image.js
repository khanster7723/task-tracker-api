const mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  ofusername: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Images", imageSchema);
