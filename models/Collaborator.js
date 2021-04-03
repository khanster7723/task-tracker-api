const mongoose = require("mongoose");

const collaboratorSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  collabusername: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Collaborators", collaboratorSchema);
