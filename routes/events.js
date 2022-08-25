const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

//Get All Tasks
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a Task
router.post("/", async (req, res) => {
  const event = new Event({
    text: req.body.text,
    day: req.body.day,
    byusername: req.body.byusername,
  });
  try {
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific Task
router.get("/:eventId", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const event = await Event.findById(req.params.eventId);
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get All Tasks for a specific User
router.get("/user/:username", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const eventsForUsername = await Event.find({
      byusername: req.params.username,
    });
    res.json(eventsForUsername);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Task
router.delete("/:eventId", async (req, res) => {
  try {
    const removedEvent = await Event.remove({ _id: req.params.eventId });
    res.json(removedEvent);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Task
router.patch("/:eventId", async (req, res) => {
  try {
    const updatedEvent = await Event.updateOne(
      { _id: req.params.eventId },
      {
        text: req.body.text,
        day: req.body.day,
        byusername: req.body.byusername,
      }
    );
    //res.json(updatedTask);

    const event = await Event.findById(req.params.eventId);
    res.json(event);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
