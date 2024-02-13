const { Router } = require('express');

const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get("/search/:search", postController.searchPostsByContent)
postRouter.get("/category/:category", postController.searchPostsByCategory)

module.exports = postRouter