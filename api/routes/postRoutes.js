const { Router } = require('express');

const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get("/:search", postController.searchPosts)

module.exports = postRouter