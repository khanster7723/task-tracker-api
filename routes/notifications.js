const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

//Get All Notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get all notifications for a specific username
router.get("/:username", (req, res) => {
  Notification.find({ tousername: req.params.username }, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.json({ items: items });
    }
  });
});

//Get notifications for a specific username to specific collab username
router.get("/notify/:tousername/:fromusername", (req, res) => {
  Notification.find(
    {
      tousername: req.params.tousername,
      fromusername: req.params.fromusername,
    },
    (err, items) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        res.json({ items: items });
      }
    }
  );
});

//Submits a Notification
router.post("/", async (req, res) => {
  const notification = new Notification({
    tousername: req.body.tousername,
    fromusername: req.body.fromusername,
    message: req.body.message,
  });
  try {
    const savedNotification = await notification.save();
    res.json(savedNotification);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a Notification
router.delete("/:notificationId", async (req, res) => {
  try {
    const removedNotification = await Notification.remove({
      _id: req.params.notificationId,
    });
    res.json(removedNotification);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
