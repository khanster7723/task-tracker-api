const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

//Get All Posts
router.get("/", async (req, res) => {
  //res.send('We are on posts from posts');
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a Post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a Specific Post
router.get("/:postId", async (req, res) => {
  //console.log(req.params.postId)
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete Post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a Post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { title: req.body.title, description: req.body.description }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
