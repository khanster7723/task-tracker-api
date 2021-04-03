const express = require("express");
const Collaborator = require("../models/Collaborator");
const router = express.Router();

//Get All Collaborators
router.get("/", async (req, res) => {
  try {
    const collaborators = await Collaborator.find();
    res.json(collaborators);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get all collaborator for a specific username
router.get("/username/:username", (req, res) => {
  Collaborator.find({ username: req.params.username }, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.json({ items: items });
    }
  });
});

//Get collaborator for specific username and collab username
router.get("/username/:username/:collabusername", (req, res) => {
  Collaborator.find(
    {
      username: req.params.username,
      collabusername: req.params.collabusername,
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

//Submits a Collaborator
router.post("/", async (req, res) => {
  const collaborator = new Collaborator({
    username: req.body.username,
    collabusername: req.body.collabusername,
  });
  const collaboratorReverse = new Collaborator({
    username: req.body.collabusername,
    collabusername: req.body.username,
  });
  try {
    const savedCollaborator = await collaborator.save();
    const savedCollaboratorReverse = await collaboratorReverse.save();
    res.json({ message: "Request Accepted Successfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Collaborator
router.delete("/:collaboratorId", async (req, res) => {
  try {
    const removedCollaborator = await Collaborator.remove({
      _id: req.params.collaboratorId,
    });
    res.json(removedCollaborator);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
