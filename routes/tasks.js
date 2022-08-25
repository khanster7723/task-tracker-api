const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

//Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a Task
router.post("/", async (req, res) => {
  const task = new Task({
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder,
    byusername: req.body.byusername,
  });
  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific Task
router.get("/:taskId", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get All Tasks for a specific User
router.get("/user/:username", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const tasksForUsername = await Task.find({
      byusername: req.params.username,
    });
    res.json(tasksForUsername);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Task
router.delete("/:taskId", async (req, res) => {
  try {
    const removedTask = await Task.deleteOne({ _id: req.params.taskId });
    res.json(removedTask);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Task
router.patch("/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      {
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder,
        byusername: req.body.byusername,
      }
    );
    //res.json(updatedTask);

    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
