const { Router } = require('express');

const replyController = require('../controllers/replyController.js');

const replyRouter = Router();

replyRouter.post("/:id", replyController.create)

module.exports = replyRouter