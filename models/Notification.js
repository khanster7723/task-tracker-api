const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  tousername: {
    type: String,
    require: true,
  },
  fromusername: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Notifications", notificationSchema);
