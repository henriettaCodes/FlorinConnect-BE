const { Router } = require('express');

const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get("/search", postController.getAllPosts)
postRouter.get("/search/:search", postController.searchPostsByContent)
postRouter.get("/category/:category", postController.searchPostsByCategory)
postRouter.get("/:id", postController.getPostById)

module.exports = postRouter