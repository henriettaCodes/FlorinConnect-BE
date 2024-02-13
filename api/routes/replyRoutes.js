const { Router } = require('express');

const replyController = require('../controllers/replyController.js');

const replyRouter = Router();

replyRouter.post("/:id", replyController.create)
replyRouter.get("/post/:id", replyController.getRepliesByPostId)
replyRouter.get("/:id", replyController.getReplyById)

module.exports = replyRouter