const express = require("express");
const Gadget = require("../models/Gadget");
const router = express.Router();

//Get All Tasks
router.get("/", async (req, res) => {
  try {
    const gadgets = await Gadget.find();
    res.json(gadgets);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a Task
router.post("/", async (req, res) => {
  const gadget = new Gadget({
    text: req.body.text,
    day: req.body.day,
    importance: req.body.importance,
    byusername: req.body.byusername,
  });
  try {
    const savedGadget = await gadget.save();
    res.json(savedGadget);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific Task
router.get("/:gadgetId", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const gadget = await Gadget.findById(req.params.gadgetId);
    res.json(gadget);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get All Tasks for a specific User
router.get("/user/:username", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const gadgetsForUsername = await Gadget.find({
      byusername: req.params.username,
    });
    res.json(gadgetsForUsername);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Task
router.delete("/:gadgetId", async (req, res) => {
  try {
    const removedGadget = await Gadget.remove({ _id: req.params.gadgetId });
    res.json(removedGadget);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Task
router.patch("/:gadgetId", async (req, res) => {
  try {
    const updatedGadget = await Gadget.updateOne(
      { _id: req.params.gadgetId },
      {
        text: req.body.text,
        day: req.body.day,
        importance: req.body.importance,
        byusername: req.body.byusername,
      }
    );
    //res.json(updatedTask);

    const gadget = await Gadget.findById(req.params.gadgetId);
    res.json(gadget);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
