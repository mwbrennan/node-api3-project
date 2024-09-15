const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model.js');
const Post = require('../posts/posts-model.js');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await User.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'users could not be retrieved' })
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = await User.insert(req.body);
  res.status(200).json(newUser)
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const update = req.body;
  const { id } = req.params;
  const userUpdated = await User.update(id, update);
  if (userUpdated) {
    res.status(200).json({ ...update, id })
  } else {
    res.status(500).json({ message: 'can not update' })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  const postDeleted = await User.delete(id);
  if (postDeleted) {
    res.status(200).json(id)
  } else {
    res.status(500).json({ message: 'will not delete post' })
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  const posts = await User.findCommentById(id);
  res.status(200).json(posts)
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const post = { ...req.body, userId: id };
  const postAdd = Post.insert(post)
  res.status(200).json(postAdd)
});

// do not forget to export the router

module.exports = router;