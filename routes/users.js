const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//Get All Tasks
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//User signing up
router.post("/signup", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    city: req.body.city,
    country: req.body.country,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific User Details By Id
router.get("/:userId", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//To login a User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user == null) {
      return res.json({ message: "username not present" });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json(user);
    } else {
      res.json({ message: "password does not match" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific User Details By Username
router.get("/login/:username", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific User Details By Username
router.get("/usersearch/:username", async (req, res) => {
  //console.log(req.params.taskId)
  try {
    const user = await User.findOne({ username: req.params.username });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete User
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a User details
router.patch("/:userId", async (req, res) => {
  try {
    const updatedTask = await User.updateOne(
      { _id: req.params.userId },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        city: req.body.city,
        country: req.body.country,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
      }
    );
    //res.json(updatedTask);

    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
