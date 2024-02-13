const { Router } = require('express')

const userController = require('../controllers/userController.js')

const userRouter = Router()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.get("/:token", userController.getAccountByToken)

module.exports = userRouter;