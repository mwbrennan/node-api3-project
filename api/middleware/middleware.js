const Users = require('../users/users-model.js');
const Posts = require('../posts/posts-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`timestamp: ${Date.now()} / method: ${req.method} / url: ${req.url}}`)
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  try {
    const user = await Users.getById(id);
    if(!user){
      res.status(404).json({ message: 'user not found' });
    } else {
      req.user = user
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'having some issues' })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  try {
    if(!name) {
      res.status(400).json({ message: 'missing user data' })
    } else {
      next()
    }
  } catch(error) {
    res.status(400).json({ message: 'missing required text field' })
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  try {
    const post = Posts.getById(id);
    if(!post) {
      res.status(400).json({ message: 'missing required text field' })
    } else {
      req.post = post
      next();
    }
  } catch (error) {
    res.status(500).json({ message: 'server issues' })
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUser,
  validateUserId,
  validatePost
}