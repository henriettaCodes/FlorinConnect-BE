const { Router } = require('express');

const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.post("/",postController.create)
postRouter.get("/search", postController.getAllPosts)
postRouter.get("/search/:search", postController.searchPostsByContent)
postRouter.get("/category/:category", postController.searchPostsByCategory)
postRouter.get("/:id", postController.getPostById)
postRouter.patch("/:id", postController.updatePostById)
postRouter.delete("/:id", postController.deletePostById)

module.exports = postRouter